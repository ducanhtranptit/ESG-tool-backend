import model from "../models/index.js";
import sections from "../constants/section.constant.js";
import UserService from "../services/user.services.js";
export default class TargetAction {
	static async findAllSubmitCountOfSection(userId, year) {
		const result = await model.UserTarget.findAll({
			where: {
				userId: userId,
				year: year,
			},
			attributes: ["sectionName", "updatedAt", "percentileCompleted"],
			raw: true,
		});
		if (result.length === 0) {
			const newRecords = [];
			for (const sectionName of Object.keys(sections)) {
				const newRecord = await model.UserTarget.create({
					userId: userId,
					year: year,
					sectionName: sectionName,
					sectionId: sections[sectionName],
					submitCount: 0,
					percentileCompleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
				newRecords.push(newRecord);
			}
			return newRecords;
		}
		return result;
	}

	static async addAnswerAndCalculateMetricOfCompany(
		userId,
		year,
		targetValues,
		sectionName
	) {
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
		let sectionPercentileCompleted = 0;

		for (let targetValue of targetValues) {
			console.log("-----------------------------------");
			console.log("Question code:", targetValue.questionCode);
			const { questionCode, answer: answerValue } = targetValue;
			if (typeof answerValue === "string") {
				const dummyRecord = await model.Dummy.findOne({
					where: {
						questionCode: questionCode,
						answer: answerValue,
					},
				});

				if (dummyRecord) {
					targetValue.answer = Number(dummyRecord.dataValues.dummy);
				} else {
					console.warn(
						`Không tìm thấy giá trị dummy cho questionCode: ${questionCode} và answer: ${answerValue}`
					);
					continue;
				}
			}
			const existingAnswer = await model.Target.findOne({
				where: {
					companyCode: companyCode,
					yearTarget: year,
					questionCode: questionCode,
				},
				raw: true,
			});
			const question = await model.Question.findOne({
				where: {
					questionCode: questionCode,
				},
				attributes: ["type", "polarityIndicating", "targetWeight"],
				raw: true,
			});

			let questionPercentileCompleted = 0;
			const currentYear = new Date().getFullYear();
			const answer = await model.Answer.findOne({
				where: {
					questionCode: questionCode,
					year: currentYear,
					companyCode: companyCode,
				},
				attributes: ["answer"],
				raw: true,
			});

			if (answer !== null && targetValue !== null) {
				console.log(
					"targetValue.answer: ",
					typeof targetValue.answer,
					targetValue.answer
				);
				console.log("answer: ", typeof answer.answer, answer.answer);
				questionPercentileCompleted =
					await TargetAction.calculateQuestionCompletionRate(
						Number(answer.answer),
						Number(targetValue.answer),
						String(question.polarityIndicating)
					);
				sectionPercentileCompleted =
					sectionPercentileCompleted +
					questionPercentileCompleted * question.targetWeight;
			}

			console.log(
				"questionPercentileCompleted: ",
				questionPercentileCompleted
			);

			if (existingAnswer) {
				await model.Target.update(
					{
						targetValue: Number(targetValue.answer),
						percentileCompleted: questionPercentileCompleted,
					},
					{
						where: {
							companyCode: companyCode,
							yearTarget: year,
							questionCode: questionCode,
						},
					}
				);
			} else {
				await model.Target.create({
					companyCode: companyCode,
					yearTarget: year,
					questionCode: questionCode,
					targetValue: answerValue,
					percentileCompleted: questionPercentileCompleted,
					questionType: question.type,
				});
			}
		}

		console.log(
			"=> Section Percentile Completed:",
			sectionPercentileCompleted
		);

		await model.UserTarget.update(
			{ percentileCompleted: sectionPercentileCompleted },
			{
				where: {
					userId: userId,
					year: year,
					sectionName: sectionName,
				},
			}
		);

		await model.UserTarget.increment(
			{ submitCount: 1 },
			{
				where: {
					userId: userId,
					year: year,
					sectionName: sectionName,
				},
			}
		);
	}

	static async getAnswersOfYear(userId, section, year, lang) {
		const sectionId = sections[section];
		if (!sectionId) {
			throw new Error("Invalid section name provided.");
		}
		const companyInfor = await UserService.getCompanyInfor(userId);
		const companyCode = companyInfor.companyCode;
		const questions = await model.Question.findAll({
			where: {
				section: sectionId,
				language: lang,
			},
			attributes: ["questionCode", "type"],
			raw: true,
		});

		let result = [];

		for (const question of questions) {
			const questionCode = question.questionCode;
			const questionType = question.type;
			let answerValue = await model.Target.findOne({
				where: {
					questionCode: questionCode,
					yearTarget: year,
					companyCode: companyCode,
				},
				attributes: ["targetValue"],
				raw: true,
			});
			if (answerValue !== null && answerValue.targetValue !== null) {
				if (questionType === 1 || questionType === 2) {
					answerValue = await model.Dummy.findOne({
						where: {
							questionCode: questionCode,
							dummy: answerValue.targetValue,
						},
						attributes: ["answer"],
						raw: true,
						// logging: console.log,
					});
					result.push({
						questionCode: questionCode,
						questionType: questionType,
						answer: parseFloat(answerValue.answer),
					});
				} else {
					result.push({
						questionCode: questionCode,
						questionType: questionType,
						answer: parseFloat(answerValue.targetValue),
					});
				}
			} else {
				result.push({
					questionCode: questionCode,
					questionType: questionType,
					answer: null,
				});
			}
		}
		return result;
	}

	static async calculateQuestionCompletionRate(T_actual, T_target, polarity) {
		console.log("polarity: ", polarity);
		console.log("T_target: ", T_target);
		console.log("T_actual: ", T_actual);
		let questionPercentileCompleted;
		if (T_target === 0) {
			if (T_actual === 0) {
				questionPercentileCompleted = 100;
			} else if (polarity === "positive") {
				questionPercentileCompleted =
					100 * (1 - Math.exp(-Math.log(1 + T_actual / T_target)));
			} else if (polarity === "negative") {
				questionPercentileCompleted =
					100 * Math.exp(-Math.log(1 + T_actual));
			} else {
				questionPercentileCompleted = 0;
			}
		} else {
			if (polarity === "positive") {
				questionPercentileCompleted =
					T_actual / T_target !== Infinity
						? (T_actual / T_target) * 100
						: null;
			} else if (polarity === "negative") {
				questionPercentileCompleted =
					T_actual / T_target !== Infinity
						? (1 - T_actual / T_target) * 100
						: null;
			}
		}

		return questionPercentileCompleted;
	}
}
