import model from "../models/index.js";
import sections from "../constants/section.constant.js";
import { raw } from "mysql2";
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

	static async getAllTopicsAndQuestions(sectionName) {
		const sectionId = sections[sectionName];
		if (!sectionId) {
			throw new Error("Invalid section name provided.");
		}

		const questions = await model.Question.findAll({
			where: {
				section: sectionId,
			},
			attributes: [
				"topicCode",
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
			raw: true,
		});

		const topicCodes = [...new Set(questions.map((q) => q.topicCode))];

		const topics = await model.Topic.findAll({
			where: {
				topicCode: topicCodes,
			},
			attributes: ["topicCode", "answerGuide"],
			raw: true,
		});

		const topicMap = topics.reduce((map, topic) => {
			map[topic.topicCode] = topic.answerGuide;
			return map;
		}, {});

		const questionsWithAnswerGuide = questions.map((question) => ({
			...question,
			answerGuide: topicMap[question.topicCode] || null,
		}));

		return questionsWithAnswerGuide;
	}

	static async addAnswerAndCalculateMetricOfCompany(
		userId,
		year,
		answers,
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
		const answerOfCompany = await model.Answer.findAll({
			where: {
				companyCode: companyCode,
				year: year,
			},
			attributes: ["questionCode", "answer"],
			raw: true,
		});
		console.log("answerOfCompany: ", answerOfCompany);
		for (let criteria of criterias) {
			const { criteriaId, criteriaCode, measurementMethod } = criteria;
			const metric = await QuestionAction.calculateMetric(
				measurementMethod,
				answerOfCompany
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
		await model.Section.increment(
			{ submitCount: 1 },
			{
				where: {
					sectionName: sectionName,
				},
			}
		);
	}

	static async getAnswersOfYear(userId, section, year) {
		const sectionId = sections[section];
		if (!sectionId) {
			throw new Error("Invalid section name provided.");
		}
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
			attributes: ["companyCode"],
			raw: true,
		});
		const companyCode = companyInfor.companyCode;

		const questions = await model.Question.findAll({
			where: {
				section: sectionId,
			},
			attributes: ["questionCode", "type"],
			raw: true,
		});

		let result = [];

		for (const question of questions) {
			const questionCode = question.questionCode;
			const questionType = question.type;
			let answerValue = await model.Answer.findOne({
				where: {
					questionCode: questionCode,
					year: year,
					companyCode: companyCode,
				},
				attributes: ["answer"],
				raw: true,
			});
			if (answerValue) {
				if (questionType === 1 || questionType === 2) {
					answerValue = await model.Dummy.findOne({
						where: {
							questionCode: questionCode,
							dummy: answerValue.answer,
						},
						attributes: ["answer"],
						raw: true,
						// logging: console.log,
					});
				}
				result.push({
					questionCode: questionCode,
					questionType: questionType,
					answer: answerValue.answer,
				});
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

	static async findAllSubmitCountOfSection() {
		const result = await model.Section.findAll({
			attributes: ["sectionName", "submitCount"],
			raw: true,
		});
		return result;
	}
}
