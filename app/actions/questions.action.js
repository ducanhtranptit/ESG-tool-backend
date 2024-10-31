import model from "../models/index.js";

export default class QuestionAction {
	static async calculateMetric(measurementMethod, dictionary) {
		const regex = /AS\d+/g;
		if (measurementMethod === null || dictionary === null) return null;
		const matches = measurementMethod.match(regex);
		if (!matches) {
			return null;
		}

		let evalString = measurementMethod;
		for (let code of matches) {
			const entry = dictionary.find((item) => item.questionCode === code);
			if (!entry || entry.answer === null || entry.answer === undefined) {
				return null;
			}
			evalString = evalString.replace(
				new RegExp(code, "g"),
				entry.answer
			);
		}
		const result = eval(evalString);
		return isNaN(result) ? null : result;
	}

	static async getAllTopicsAndQuestions() {
		const topics = await model.Topic.findAll({
			attributes: ["topicCode", "name", "answerGuide"],
			raw: true,
		});

		const result = [];

		for (const topic of topics) {
			const questions = await model.Question.findAll({
				where: {
					topicCode: topic.topicCode,
				},
				attributes: [
					"questionCode",
					"name",
					"type",
					"answer1",
					"answer2",
					"answer3",
					"answer4",
					"answer5",
					"answer6",
					"answer7",
					"answer8",
					"answer9",
					"answer10",
				],
			});

			result.push({
				topicCode: topic.topicCode,
				name: topic.name,
				answerGuide: topic.answerGuide,
				questions,
			});
		}

		return result;
	}

	static async addAnswerAndCalculateMetricOfCompany(userId, year, answers) {
		const userInfor = await model.User.findOne({
			where: {
				id: userId,
			},
		});
		const companyId = userInfor.dataValues.companyId;
		const companyInfor = await model.Company.findOne({
			where: {
				id: companyId,
			},
		});
		const companyCode = companyInfor.dataValues.companyCode;

		for (let answer of answers) {
			const { questionCode, answer: answerValue } = answer;
			if (typeof answerValue === "string") {
				const dummyRecord = await model.Dummy.findOne({
					where: {
						questionCode: questionCode,
						answer: answerValue,
					},
				});

				if (dummyRecord) {
					answer.answer = Number(dummyRecord.dataValues.dummy);
				} else {
					console.warn(
						`Không tìm thấy giá trị dummy cho questionCode: ${questionCode} và answer: ${answerValue}`
					);
					continue;
				}
			}
			const existingAnswer = await model.Answer.findOne({
				where: {
					companyCode: companyCode,
					year: year,
					questionCode: questionCode,
				},
			});

			if (existingAnswer) {
				await model.Answer.update(
					{
						answer: answer.answer,
					},
					{
						where: {
							companyCode: companyCode,
							year: year,
							questionCode: questionCode,
						},
					}
				);
			} else {
				await model.Answer.create({
					companyCode: companyCode,
					year: year,
					questionCode: questionCode,
					answer: answer.answer,
				});
			}
		}

		const company = await model.Company.findOne({
			where: { companyCode },
			attributes: ["industryCodeLevel2", "id"],
		});
		const industryCodeLevel2 = company.dataValues.industryCodeLevel2;
		const criterias = await model.Criteria.findAll({
			where: {
				applicableIndustryCode: industryCodeLevel2,
			},
			attributes: ["criteriaId", "criteriaCode", "measurementMethod"],
		});
		for (let criteria of criterias) {
			const { criteriaId, criteriaCode, measurementMethod } = criteria;
			const metric = await QuestionAction.calculateMetric(
				measurementMethod,
				answers
			);

			const existingMetric = await model.CompanyMetric.findOne({
				where: {
					companyCode,
					companyId,
					year,
					criteriaId,
				},
			});

			if (existingMetric) {
				await model.CompanyMetric.update(
					{
						metric: metric,
						criteriaCode: criteriaCode,
					},
					{
						where: {
							companyCode,
							companyId,
							year,
							criteriaId,
						},
					}
				);
			} else {
				await model.CompanyMetric.create({
					companyCode,
					companyId,
					year,
					metric,
					criteriaId,
					criteriaCode,
				});
			}
		}
	}
}
