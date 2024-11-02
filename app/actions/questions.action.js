import model from "../models/index.js";
import sections from "../constants/section.constant.js";
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

		// Truy vấn tất cả câu hỏi trong section tương ứng
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

		// Lấy danh sách topicCode duy nhất từ các câu hỏi để truy vấn bảng Topic
		const topicCodes = [...new Set(questions.map((q) => q.topicCode))];

		// Truy vấn bảng Topic để lấy answerGuide cho mỗi topicCode
		const topics = await model.Topic.findAll({
			where: {
				topicCode: topicCodes,
			},
			attributes: ["topicCode", "answerGuide"],
			raw: true,
		});

		// Tạo một map để tra cứu nhanh answerGuide theo topicCode
		const topicMap = topics.reduce((map, topic) => {
			map[topic.topicCode] = topic.answerGuide;
			return map;
		}, {});

		// Gán answerGuide vào từng câu hỏi
		const questionsWithAnswerGuide = questions.map((question) => ({
			...question,
			answerGuide: topicMap[question.topicCode] || null,
		}));

		return questionsWithAnswerGuide;
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
