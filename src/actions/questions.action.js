import model from "../models/index.js";
import sections from "../constants/section.constant.js";
import UserType from "../constants/user-type.constant.js";
import UserService from "../services/user.services.js";
import { Sequelize } from "sequelize";
export default class QuestionAction {
	static buildSearchConditions(filters) {
		const conditions = {};
		if (filters.name) {
			conditions.name = {
				[Sequelize.Op.like]: `%${filters.name}%`,
			};
		}
		if (filters.topicCode) {
			conditions.topicCode = filters.topicCode;
		}
		if (filters.questionCode) {
			conditions.questionCode = filters.questionCode;
		}
		if (filters.section) {
			conditions.section = filters.section;
		}
		if (filters.type) {
			conditions.type = filters.type;
		}
		if (filters.page) {
			conditions.page = filters.page;
		}
		if (filters.limit) {
			conditions.limit = filters.limit;
		}
		return conditions;
	}

	static async findAll() {
		const questions = await model.Question.findAll({
			attributes: [
				"questionCode",
				"topicCode",
				"name",
				"language",
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
		return questions;
	}

	static async findAllTopics() {
		const topics = await model.Topic.findAll({
			attributes: ["topicCode", "name", "answerGuide", "language"],
			raw: true,
		});
		return topics;
	}

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
		if (result === Infinity) return null;
		return isNaN(result) ? null : result;
	}

	static async getAllTopicsAndQuestions(sectionName, lang) {
		const sectionId = sections[sectionName];
		if (!sectionId) {
			return null;
		}

		const questions = await model.Question.findAll({
			where: {
				section: sectionId,
				language: lang,
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
				language: lang,
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

		if (userInfor.dataValues.type === UserType.USER_NOT_ACTIVE) {
			await model.UserSection.increment(
				{ submitCount: 1 },
				{
					where: {
						userId: userId,
						year: year,
						sectionName: sectionName,
					},
				}
			);
			console.log("User is not active");
			return;
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
		await model.UserSection.increment(
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
			let answerValue = await model.Answer.findOne({
				where: {
					questionCode: questionCode,
					year: year,
					companyCode: companyCode,
				},
				attributes: ["answer"],
				raw: true,
			});
			if (answerValue !== null && answerValue.answer !== null) {
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
					answer: parseFloat(answerValue.answer),
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

	static async findAllSubmitCountOfSection(userId, year) {
		const result = await model.UserSection.findAll({
			where: {
				userId: userId,
				year: year,
			},
			attributes: ["sectionName", "submitCount", "updatedAt"],
			raw: true,
		});
		if (result.length === 0) {
			const newRecords = [];
			for (const sectionName of Object.keys(sections)) {
				const newRecord = await model.UserSection.create({
					userId: userId,
					year: year,
					sectionName: sectionName,
					sectionId: sections[sectionName],
					submitCount: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
				newRecords.push(newRecord);
			}
			return newRecords;
		}
		return result;
	}

	static async findAllAnswers(filter) {
		const conditions = QuestionAction.buildSearchConditions(filter);
		const offset = (conditions.page - 1) * conditions.limit;

		// Lấy dữ liệu từ bảng Answer
		const answers = await model.Answer.findAll({
			attributes: ["companyCode", "year", "questionCode", "answer"],
			raw: true,
			offset: parseInt(offset, 10),
			limit: parseInt(conditions.limit, 10),
		});

		// Lấy dữ liệu câu hỏi tương ứng với questionCode
		const questionCodes = answers.map((answer) => answer.questionCode);
		const questions = await model.Question.findAll({
			attributes: ["questionCode", "name", "type"],
			where: {
				questionCode: {
					[Sequelize.Op.in]: questionCodes,
				},
				language: "vi",
			},
			raw: true,
		});

		// Tạo map để ánh xạ questionCode với name và type
		const questionMap = questions.reduce((acc, question) => {
			acc[question.questionCode] = {
				name: question.name,
				type: question.type,
			};
			return acc;
		}, {});

		// Chuẩn bị dữ liệu kết quả
		const result = await Promise.all(
			answers.map(async (answer) => {
				const question = questionMap[answer.questionCode];
				let finalAnswer = answer.answer;

				// Nếu question.type là 1 hoặc 2, lấy dữ liệu từ bảng Dummy
				if (question?.type === 1 || question?.type === 2) {
					const dummyAnswer = await model.Dummy.findOne({
						where: {
							questionCode: answer.questionCode,
							dummy: answer.answer,
						},
						attributes: ["answer"],
						raw: true,
					});

					const answerText = await model.Question.findOne({
						where: {
							questionCode: answer.questionCode,
							language: "vi",
						},
						attributes: [
							[`answer${dummyAnswer.answer}`, "answerText"],
						],
						raw: true,
					});
					if (answerText) {
						finalAnswer = answerText.answerText;
					}
				}

				return {
					companyCode: answer.companyCode,
					year: answer.year,
					questionCode: answer.questionCode,
					questionName: question?.name || "Câu hỏi không tồn tại",
					questionType: question?.type || "Không xác định",
					answer: finalAnswer,
				};
			})
		);
		// Tính tổng số bản ghi
		const total = await model.Answer.count();

		// Trả về dữ liệu
		return {
			data: result,
			total,
			totalPages: Math.ceil(total / conditions.limit),
			currentPage: conditions.page,
		};
	}
}
