import model from "../models/index.js";
import { Op } from "sequelize";
import ESGPillar from "../constants/esg-pillars.constant.js";
import ESGRank from "../constants/esg-rank.constant.js";

export default class EsgReportAction {
	/**
	 * Tính toán và cập nhật điểm số ESG (Môi trường, Xã hội và Quản trị) và xếp hạng cho các công ty
	 * trong vòng năm năm qua. Quá trình bao gồm:
	 * - Lấy và nhóm các chỉ số công ty theo năm, ngành và tiêu chí.
	 * - Cập nhật các chỉ số với số lượng công ty có giá trị và xếp hạng chúng dựa trên tính chất (polarity).
	 * - Tính toán điểm số cho mỗi công ty và cập nhật các bảng CriteriaScore và CompanyScore.
	 * - Chuẩn hóa điểm số theo trọng số tiêu chí và cập nhật trọng số các trụ cột.
	 * - Tính toán và cập nhật điểm số ESG và xếp hạng cho mỗi công ty trong ngành của chúng.
	 * - Ghi lại tiến trình và hoàn tất quá trình tính toán điểm số ESG.
	 *
	 * Hàm này tương tác với nhiều model bao gồm CompanyMetric, Company, Criteria, CriteriaScore,
	 * và CompanyScore để thực hiện các tính toán và cập nhật cần thiết.
	 */
	static async calculateESGReport() {
		const currentYear = new Date().getFullYear();

		await EsgReportAction.calculateNoOfCompaniesWithAWorseMetricValue(
			currentYear
		);

		await EsgReportAction.calculateCompanyScore();

		await EsgReportAction.calculatePillarWeight();

		await EsgReportAction.calculateNewCriteriaWeight();

		await EsgReportAction.calculateScoreMultipleNewCriteriaWeight();

		await EsgReportAction.calculateScoreMultipleCriteriaWeight();

		const companyCodes = await model.Company.findAll({
			attributes: ["companyCode", "industryCodeLevel2"],
		});

		await EsgReportAction.calculateESGScore(companyCodes, currentYear);

		await EsgReportAction.calculateESGRank(companyCodes, currentYear);

		console.log("ESG score calculation has been completed successfully!");
	}

	/**
	 * Tính toán và cập nhật số lượng công ty có giá trị chỉ số thấp hơn
	 * so với từng công ty trong 5 năm qua. Quá trình bao gồm:
	 * - Lấy và nhóm các chỉ số công ty theo năm, ngành và tiêu chí.
	 * - Cập nhật các chỉ số với số lượng công ty có giá trị chỉ số cụ thể
	 *   và xếp hạng chúng dựa trên tính chất (polarity).
	 * - Nhóm các chỉ số theo giá trị chỉ số, năm và ID tiêu chí để cập nhật
	 *   số lượng công ty có cùng giá trị chỉ số.
	 *
	 * @param {number} currentYear - Năm hiện tại để bắt đầu tính toán.
	 */
	static async calculateNoOfCompaniesWithAWorseMetricValue(currentYear) {
		for (let year = currentYear; year > currentYear - 5; year--) {
			// Lấy tất cả các metrics của công ty cho năm hiện tại
			const companyMetrics = await model.CompanyMetric.findAll({
				where: {
					year: year,
					metric: { [Op.ne]: null },
				},
				attributes: [
					"companyCode",
					"metric",
					"criteriaCode",
					"year",
					"criteriaId",
					"metricId",
					"noOfCompaniesWithAValue",
					"rank",
					"noOfCompaniesWithTheSameValueIncludedInTheCurrentOne",
				],
			});

			const companies = await model.Company.findAll({
				attributes: ["companyCode", "industryCodeLevel2"],
			});

			// Nhóm các metrics theo year, industryCodeLevel2, và criteriaCode
			const groupedByIndustryCriteria = {};

			companyMetrics.forEach((metric) => {
				const { companyCode, criteriaCode, year } = metric;

				const company = companies.find(
					(c) => c.companyCode === companyCode
				);
				if (company) {
					const { industryCodeLevel2 } = company;

					const groupKey = `${year}-${industryCodeLevel2}-${criteriaCode}`;

					if (!groupedByIndustryCriteria[groupKey]) {
						groupedByIndustryCriteria[groupKey] = {
							year,
							industryCodeLevel2,
							criteriaCode,
							companyCodes: [],
							metrics: [],
						};
					}

					groupedByIndustryCriteria[groupKey].companyCodes.push(
						companyCode
					);
					groupedByIndustryCriteria[groupKey].metrics.push(metric);
				}
			});

			for (const groupKey in groupedByIndustryCriteria) {
				const group = groupedByIndustryCriteria[groupKey];
				const count = group.companyCodes.length;

				// Lưu số lượng vào cột noOfCompaniesWithAValue
				await model.CompanyMetric.update(
					{ noOfCompaniesWithAValue: count },
					{
						where: {
							companyCode: group.companyCodes,
							year: group.year,
							criteriaCode: group.criteriaCode,
						},
					}
				);

				// Lấy giá trị của cột polarityIndicating từ bảng Criteria
				const criteria = await model.Criteria.findOne({
					where: {
						criteriaCode: group.criteriaCode,
					},
					attributes: ["polarityIndicating"],
				});

				const polarity = criteria.dataValues.polarityIndicating;

				// Sắp xếp theo polarityIndicating
				if (polarity === "positive" || polarity === "") {
					group.metrics.sort(
						(a, b) => b.dataValues.metric - a.dataValues.metric
					);
				} else if (polarity === "negative") {
					group.metrics.sort(
						(a, b) => a.dataValues.metric - b.dataValues.metric
					);
				}

				const metricsList = group.metrics.map(
					(item) => item.dataValues.metricId
				);

				let currentRank = 1;
				for (let i = 0; i < metricsList.length; i++) {
					// Nếu đây không phải là phần tử đầu tiên và metric hiện tại bằng với metric trước đó
					if (
						i === 0 ||
						group.metrics[i].dataValues.metric !==
							group.metrics[i - 1].dataValues.metric
					) {
						currentRank = i + 1;
					}
					await model.CompanyMetric.update(
						{ rank: currentRank },
						{ where: { metricId: metricsList[i] } }
					);
				}

				console.log(
					`Processed groupKey ${groupKey}: ${count} companies updated and ranked`
				);
			}

			// Nhóm các metrics theo metric, year, và criteriaId
			const groupedByMetric = companyMetrics.reduce((acc, metric) => {
				const { metric: metricValue, criteriaId, year } = metric;

				const groupKey = `${metricValue}-${year}-${criteriaId}`;

				if (!acc[groupKey]) {
					acc[groupKey] = [];
				}
				acc[groupKey].push(metric);

				return acc;
			}, {});

			for (const groupKey in groupedByMetric) {
				const metrics = groupedByMetric[groupKey];
				// Chia nhóm các công ty theo metric
				const companyCodes = metrics.map((m) => {
					return {
						companyCode: m.dataValues.companyCode,
						metricId: m.dataValues.metricId,
					};
				});
				for (let company of companyCodes) {
					const count = companyCodes.length;
					await model.CompanyMetric.update(
						{
							noOfCompaniesWithTheSameValueIncludedInTheCurrentOne:
								count,
						},
						{
							where: {
								metricId: company.metricId,
							},
						}
					);
					console.log(
						`Processed ${count} companies for metric groupKey ${groupKey}`
					);
				}
			}
		}
	}

	/**
	 * Tính toán và cập nhật điểm ESG cho từng công ty dựa trên các chỉ số của họ.
	 * Quá trình bao gồm:
	 * - Lấy tất cả các chỉ số của công ty.
	 * - Tính toán số lượng công ty có giá trị chỉ số thấp hơn.
	 * - Tính toán điểm của công ty dựa trên các giá trị đã tính toán.
	 * - Cập nhật bảng CompanyMetric và CriteriaScore với các điểm số mới.
	 * - Ghi lại tiến trình của quá trình tính toán.
	 * Nếu chỉ số hoặc số lượng công ty có giá trị bằng null, điểm số sẽ được đặt là 0.
	 */
	static async calculateCompanyScore() {
		const companyMetricsToCalculateNoOfCompaniesWithAWorseValue =
			await model.CompanyMetric.findAll();

		for (const companyMetric of companyMetricsToCalculateNoOfCompaniesWithAWorseValue) {
			const {
				noOfCompaniesWithAValue,
				rank,
				noOfCompaniesWithTheSameValueIncludedInTheCurrentOne,
				year,
				companyCode,
				criteriaId,
				criteriaCode,
				metricId,
				metric,
			} = companyMetric.dataValues;

			// Kiểm tra nếu metric và noOfCompaniesWithAValue khác null
			let companyScore;
			if (
				metric !== null &&
				noOfCompaniesWithAValue !== null &&
				noOfCompaniesWithAValue !== 0
			) {
				const noOfCompaniesWithAWorseValue =
					noOfCompaniesWithAValue -
					rank -
					noOfCompaniesWithTheSameValueIncludedInTheCurrentOne +
					1;

				companyScore =
					(noOfCompaniesWithAWorseValue +
						noOfCompaniesWithTheSameValueIncludedInTheCurrentOne /
							2) /
					noOfCompaniesWithAValue;

				// Cập nhật noOfCompaniesWithAWorseValue và score
				await model.CompanyMetric.update(
					{ noOfCompaniesWithAWorse: noOfCompaniesWithAWorseValue },
					{
						where: {
							metricId: metricId,
						},
					}
				);
				console.log(
					`Finished calculating and updating noOfCompaniesWithAWorseValue for metricId ${metricId} by value: ${noOfCompaniesWithAWorseValue}`
				);
			} else {
				companyScore = 0;
			}

			// Tạo mới hoặc cập nhật CriteriaScore
			const criteriaScore = await model.CriteriaScore.findAll({
				where: { metricId: metricId },
			});

			if (!criteriaScore.length) {
				const criteria = await model.Criteria.findOne({
					where: { criteriaId: criteriaId },
				});
				const pillarId = criteria.dataValues.pillarId;
				await model.CriteriaScore.create({
					companyCode: companyCode,
					criteriaCode: criteriaCode,
					criteriaId: criteriaId,
					year: year,
					metricId: metricId,
					pillarId: pillarId,
					score: companyScore,
				});
			} else {
				await model.CriteriaScore.update(
					{ score: companyScore },
					{
						where: {
							metricId: metricId,
						},
					}
				);
			}

			console.log(
				`Finished calculating and updating company score for metricId ${metricId} by value: ${companyScore}`
			);
		}
	}

	/**
	 * Tính toán và cập nhật tổng trọng số cho từng trụ cột ESG dựa trên trọng số các tiêu chí.
	 * Lấy tất cả các tiêu chí, nhóm chúng theo trụ cột và mã ngành, cộng tổng trọng số của chúng,
	 * và cập nhật trường pillarWeight trong cơ sở dữ liệu cho mỗi nhóm.
	 * Ghi lại trọng số của trụ cột đã được cập nhật cho mỗi bộ criteriaIds.
	 */
	static async calculatePillarWeight() {
		// Tính tổng weight và cập nhật pillarWeight
		const criteriaList = await model.Criteria.findAll({
			attributes: [
				"pillarId",
				"applicableIndustryCode",
				"criteriaId",
				"weight",
			],
		});

		const groupedCriteria = criteriaList.reduce((acc, criterion) => {
			const { pillarId, applicableIndustryCode, criteriaId, weight } =
				criterion.dataValues;
			const key = `${pillarId}-${applicableIndustryCode}`;

			if (!acc[key]) {
				acc[key] = {
					pillarId,
					applicableIndustryCode,
					totalWeight: 0,
					criteriaIds: [],
				};
			}

			acc[key].totalWeight += weight;
			acc[key].criteriaIds.push(criteriaId);

			return acc;
		}, {});

		for (const key in groupedCriteria) {
			const { totalWeight, criteriaIds } = groupedCriteria[key];
			await model.Criteria.update(
				{ pillarWeight: totalWeight },
				{
					where: {
						criteriaId: criteriaIds,
					},
				}
			);

			console.log(
				`Updated pillarWeight to ${totalWeight} for criteriaIds`
			);
		}
	}

	/**
	 * Tính toán và cập nhật trọng số mới cho mỗi tiêu chí bằng cách chia trọng số của nó
	 * cho trọng số của trụ cột. Phương thức này lấy tất cả các tiêu chí với trọng số hiện tại
	 * và trọng số trụ cột của chúng, tính toán trọng số mới cho mỗi tiêu chí, và cập nhật cơ sở dữ liệu
	 * tương ứng. Ghi lại trọng số mới của tiêu chí đã được cập nhật cho mỗi mã tiêu chí.
	 */
	static async calculateNewCriteriaWeight() {
		const criteriasForCalculateNewCriteriaWeight =
			await model.Criteria.findAll({
				attributes: ["criteriaCode", "weight", "pillarWeight"],
			});
		for (const criteria of criteriasForCalculateNewCriteriaWeight) {
			const { weight, pillarWeight, criteriaCode } = criteria.dataValues;
			const newCriteriaWeight = weight / pillarWeight;
			await model.Criteria.update(
				{ newCriteriaWeight: newCriteriaWeight },
				{
					where: {
						criteriaCode: criteriaCode,
					},
				}
			);
			console.log(
				`Updated newCriteriaWeight to ${newCriteriaWeight} for criteriaCode: ${criteriaCode}`
			);
		}
	}

	/**
	 * Tính toán và cập nhật scoreMultipleNewCriteriaWeight cho mỗi điểm tiêu chí.
	 * Phương thức này lấy tất cả các điểm tiêu chí, lấy trọng số mới của tiêu chí tương ứng
	 * cho mỗi mã tiêu chí, tính toán tích giữa điểm và trọng số mới của tiêu chí,
	 * và cập nhật mô hình CriteriaScore với giá trị đã tính toán.
	 * Ghi lại scoreMultipleNewCriteriaWeight đã được cập nhật cho mỗi metricId.
	 */
	static async calculateScoreMultipleNewCriteriaWeight() {
		// Tính scoreMultipleNewCriteriaWeight
		const criteriaScoresToCalculatescoreMultipleNewCriteriaWeight =
			await model.CriteriaScore.findAll({
				attributes: ["metricId", "criteriaCode", "score"],
			});

		for (const criteriaScore of criteriaScoresToCalculatescoreMultipleNewCriteriaWeight) {
			const { criteriaCode, score, metricId } = criteriaScore.dataValues;
			const criteria = await model.Criteria.findOne({
				where: {
					criteriaCode: criteriaCode,
				},
				attributes: ["newCriteriaWeight"],
			});

			const newCriteriaWeight = criteria.dataValues.newCriteriaWeight;
			const scoreMultipleNewCriteriaWeight = score * newCriteriaWeight;
			await model.CriteriaScore.update(
				{
					scoreMultipleNewCriteriaWeight:
						scoreMultipleNewCriteriaWeight,
				},
				{
					where: {
						metricId: metricId,
					},
				}
			);

			console.log(
				`Updated scoreMultipleNewCriteriaWeight to ${scoreMultipleNewCriteriaWeight} for metricId ${metricId}`
			);
		}
	}

	/**
	 * Tính toán và cập nhật scoreMultipleCriteriaWeight cho mỗi điểm tiêu chí.
	 * Phương thức này lấy tất cả các điểm tiêu chí, lấy trọng số tương ứng cho mỗi
	 * tiêu chí, tính toán tích giữa điểm và trọng số, và cập nhật mô hình CriteriaScore
	 * với giá trị scoreMultipleCriteriaWeight đã tính toán. Ghi lại giá trị đã cập nhật cho mỗi metricId.
	 */
	static async calculateScoreMultipleCriteriaWeight() {
		// Tính scoreMultipleCriteriaWeight
		const criteriaScoresToCalculatescoreMultipleCriteriaWeight =
			await model.CriteriaScore.findAll({
				attributes: ["metricId", "criteriaCode", "score"],
			});

		for (const criteriaScore of criteriaScoresToCalculatescoreMultipleCriteriaWeight) {
			const { criteriaCode, score, metricId } = criteriaScore.dataValues;
			const criteria = await model.Criteria.findOne({
				where: {
					criteriaCode: criteriaCode,
				},
				attributes: ["weight"],
			});

			const weight = criteria.dataValues.weight;
			const scoreMultipleCriteriaWeight = score * weight;
			await model.CriteriaScore.update(
				{ scoreMultipleCriteriaWeight: scoreMultipleCriteriaWeight },
				{
					where: {
						metricId: metricId,
					},
				}
			);

			console.log(
				`Updated scoreMultipleCriteriaWeight to ${scoreMultipleCriteriaWeight} for metricId ${metricId}`
			);
		}
	}

	/**
	 * Tính toán và cập nhật điểm số ESG (Môi trường, Xã hội và Quản trị) cho danh sách các công ty
	 * trong vòng năm năm qua. Quá trình này bao gồm:
	 * - Lặp qua từng công ty và từng trụ cột ESG để tính toán điểm số chuẩn hóa dựa trên trọng số tiêu chí.
	 * - Lưu hoặc cập nhật các điểm số này vào mô hình CompanyScore.
	 * - Tính toán điểm ESG tổng thể bằng cách cộng dồn điểm số của tất cả các trụ cột.
	 * - Ghi lại các điểm số đã tính toán cho từng công ty và năm.
	 *
	 * @param {Array} companyCodes - Mảng các đối tượng công ty chứa mã công ty.
	 * @param {number} currentYear - Năm hiện tại để bắt đầu tính toán.
	 */
	static async calculateESGScore(companyCodes, currentYear) {
		for (const company of companyCodes) {
			const { companyCode } = company.dataValues;
			// Tính điểm E - S - G
			for (const pillar of ESGPillar) {
				for (let year = currentYear; year > currentYear - 5; year--) {
					let totalScore = 0;
					// Lấy danh sách các CriteriaScore với score khác NULL
					const criteriaScoresOfCompany =
						await model.CriteriaScore.findAll({
							where: {
								companyCode,
								year,
								pillarId: pillar.id,
							},
							attributes: [
								"criteriaId",
								"scoreMultipleNewCriteriaWeight",
							],
						});

					if (criteriaScoresOfCompany.length) {
						// Cộng tổng scoreMultipleNewCriteriaWeight
						for (const criteriaScore of criteriaScoresOfCompany) {
							totalScore +=
								criteriaScore.dataValues
									.scoreMultipleNewCriteriaWeight;
						}

						// Lấy danh sách criteriaId từ criteriaScoresOfCompany
						const criteriaIds = criteriaScoresOfCompany.map(
							(criteriaScore) =>
								criteriaScore.dataValues.criteriaId
						);

						// Tính tổng newCriteriaWeight từ bảng Criteria dựa trên criteriaId
						const totalWeight = await model.Criteria.sum(
							"newCriteriaWeight",
							{
								where: {
									criteriaId: criteriaIds,
								},
							}
						);

						// Chia totalScore cho tổng trọng số nếu totalWeight > 0
						const normalizedScore = totalScore / totalWeight;

						// Tìm hoặc tạo bản ghi mới trong bảng CompanyScore
						await model.CompanyScore.findOrCreate({
							where: { companyCode, year },
							defaults: { [pillar.scoreField]: normalizedScore },
						}).then(([companyScore, created]) => {
							// Nếu bản ghi đã tồn tại, cập nhật normalizedScore
							if (!created) {
								companyScore.update({
									[pillar.scoreField]: normalizedScore,
								});
							}
						});

						console.log(
							`Year: ${year}, Company: ${companyCode}, ${pillar.logMessage}: ${normalizedScore}`
						);
					}
				}
			}

			// Tính điểm ESG
			for (let year = currentYear; year > currentYear - 5; year--) {
				let totalScore = 0;
				let totalCriteriaWeight = 0;
				let esgScore = 0;
				const criteriaScoresOfCompany =
					await model.CriteriaScore.findAll({
						where: {
							companyCode,
							year,
						},
						attributes: [
							"criteriaId",
							"scoreMultipleCriteriaWeight",
						],
					});

				if (criteriaScoresOfCompany.length) {
					for (const criteriaScore of criteriaScoresOfCompany) {
						const criteriaWeight = await model.Criteria.findOne({
							where: {
								criteriaId: criteriaScore.dataValues.criteriaId,
							},
							attributes: ["weight"],
						});

						totalCriteriaWeight += criteriaWeight.dataValues.weight;
						totalScore +=
							criteriaScore.dataValues
								.scoreMultipleCriteriaWeight;
					}

					esgScore = totalScore / totalCriteriaWeight;

					// Tìm hoặc tạo bản ghi mới trong bảng CompanyScore
					await model.CompanyScore.findOrCreate({
						where: { companyCode, year },
						defaults: { esgScore: esgScore },
					}).then(([companyScore, created]) => {
						// Nếu bản ghi đã tồn tại, cập nhật esgScore
						if (!created) {
							companyScore.update({ esgScore: esgScore });
						}
					});

					console.log(
						`Year: ${year}, Company: ${companyCode}, ESG Score: ${esgScore}`
					);
				}
			}
		}
	}

	/**
	 * Tính toán và cập nhật xếp hạng ESG cho danh sách các công ty trong vòng năm năm qua.
	 * Quá trình này bao gồm:
	 * - Lấy thông tin các công ty trong cùng ngành và tính toán điểm số của chúng.
	 * - Lặp qua từng năm và từng loại xếp hạng ESG để xác định và cập nhật xếp hạng.
	 * - Sắp xếp các công ty theo điểm số và gán xếp hạng dựa trên thứ tự điểm số.
	 * - Cập nhật xếp hạng ESG tổng thể cho từng công ty dựa trên điểm số ESG của chúng.
	 *
	 * @param {Array} companyCodes - Mảng các đối tượng công ty chứa mã công ty và mã ngành của công ty.
	 * @param {number} currentYear - Năm hiện tại để bắt đầu tính toán xếp hạng.
	 */
	static async calculateESGRank(companyCodes, currentYear) {
		for (const company of companyCodes) {
			const { companyCode, industryCodeLevel2 } = company.dataValues;
			// Lấy tất cả các công ty có cùng industryCodeLevel2 từ bảng Company
			const companiesWithSameIndustry = await model.Company.findAll({
				where: { industryCodeLevel2 },
				attributes: ["companyCode"],
			});

			const companyCodesSameIndustry = companiesWithSameIndustry.map(
				(c) => c.companyCode
			);

			// Lặp qua từng năm, từ năm hiện tại trở về 5 năm trước
			for (let year = currentYear; year > currentYear - 5; year--) {
				for (const rankType of ESGRank) {
					const rankField = rankType.rankField;
					const scoreField = rankField.replace("Rank", "Score");

					// Lấy và sắp xếp các điểm của công ty theo scoreField cho năm hiện tại
					const scores = await model.CompanyScore.findAll({
						where: {
							companyCode: companyCodesSameIndustry,
							year: year,
						},
						attributes: ["companyCode", scoreField],
						order: [[scoreField, "DESC"]],
					});

					let currentRank = 1;
					for (let i = 0; i < scores.length; i++) {
						if (
							i > 0 &&
							scores[i][scoreField] !== scores[i - 1][scoreField]
						) {
							currentRank = i + 1;
						}

						// Kiểm tra nếu companyCode hiện tại trùng với công ty trong vòng lặp, lưu rank
						if (scores[i].companyCode === companyCode) {
							await model.CompanyScore.update(
								{ [rankField]: currentRank },
								{
									where: {
										companyCode: companyCode,
										year: year,
									},
								}
							);
							break;
						}
					}
				}

				// Xếp hạng tổng thể dựa trên esgScore cho năm hiện tại
				const esgScores = await model.CompanyScore.findAll({
					where: {
						companyCode: companyCodesSameIndustry,
						year: year,
					},
					attributes: ["companyCode", "esgScore"],
					order: [["esgScore", "DESC"]],
				});

				let esgCurrentRank = 1;
				for (let i = 0; i < esgScores.length; i++) {
					if (
						i > 0 &&
						esgScores[i].esgScore !== esgScores[i - 1].esgScore
					) {
						esgCurrentRank = i + 1;
					}

					if (esgScores[i].companyCode === companyCode) {
						await model.CompanyScore.update(
							{ esgRank: esgCurrentRank },
							{
								where: {
									companyCode: companyCode,
									year: year,
								},
							}
						);
						break;
					}
				}
			}

			console.log("Updated ranks for company:", companyCode);
		}
	}
}
