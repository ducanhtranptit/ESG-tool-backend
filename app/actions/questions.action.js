import model from "../models/index.js";

export default class QuestionAction {
	static async calculateMetric(measurementMethod, dictionary) {
		// console.log('dictionary: ', dictionary);
		const regex = /AS\d+/g;
		if (measurementMethod === null || dictionary === null) return null;
		const matches = measurementMethod.match(regex);
		// console.log('matches: ', matches);

		// Nếu không tìm thấy mã nào trong measurementMethod, trả về null
		if (!matches) {
			return null;
		}

		let evalString = measurementMethod;
		// console.log('evalString: ', evalString);

		// Duyệt qua từng mã questionCode trong measurementMethod
		for (let code of matches) {
			const entry = dictionary.find((item) => item.questionCode === code);

			// Nếu câu trả lời là null hoặc undefined, trả về null
			if (!entry || entry.answer === null || entry.answer === undefined) {
				return null; // Nếu có bất kỳ câu trả lời nào là null, trả về null
			}

			// Thay thế mã câu hỏi bằng giá trị câu trả lời trong biểu thức
			evalString = evalString.replace(
				new RegExp(code, "g"),
				entry.answer
			);
		}

		// Trả về kết quả của biểu thức
		const result = eval(evalString);
		return isNaN(result) ? null : result;
	}

	// static async calculateMetric(mesurementMethod, dictionary) {
	// 	const regex = /AS\d+/g;
	// 	if (mesurementMethod === null || dictionary === null) return null;
	// 	const matches = mesurementMethod.match(regex);
	// 	let evalString = mesurementMethod;
	// 	matches.forEach((code) => {
	// 		const entry = dictionary.find((item) => item.questionCode === code);
	// 		if (entry && entry.answer !== undefined) {
	// 			evalString = evalString.replace(
	// 				new RegExp(code, "g"),
	// 				entry.answer
	// 			);
	// 		}
	// 	});
	// 	const result = eval(evalString);
	// 	return result;
	// }
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
		// console.log('answers: ', answers);
		// Lấy thông tin người dùng và công ty
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
		// Lặp qua từng câu trả lời trong answers và xử lý các câu trả lời dạng chuỗi
		for (let answer of answers) {
			const { questionCode, answer: answerValue } = answer;

			// Nếu answer là chuỗi, tra bảng Dummy để lấy giá trị số tương ứng
			if (typeof answerValue === "string") {
				const dummyRecord = await model.Dummy.findOne({
					where: {
						questionCode: questionCode,
						answer: answerValue,
					},
				});

				if (dummyRecord) {
					// Nếu tìm thấy giá trị trong bảng Dummy, thay thế answer bằng dummy
					answer.answer = Number(dummyRecord.dataValues.dummy);
				} else {
					console.warn(
						`Không tìm thấy giá trị dummy cho questionCode: ${questionCode} và answer: ${answerValue}`
					);
					continue;
				}
			}
			// await model.Answer.create({
			// 	companyCode: companyCode,
			// 	year: year,
			// 	questionCode: questionCode,
			// 	answer: answer.answer,
			// });
		}

		// Lấy mã ngành công nghiệp của công ty để tính toán chỉ số
		const company = await model.Company.findOne({
			where: { companyCode },
			attributes: ["industryCodeLevel3", "id"],
		});
		const industryCodeLevel3 = company.dataValues.industryCodeLevel3;
		const criterias = await model.Criteria.findAll({
			where: {
				applicableIndustryCode: industryCodeLevel3,
			},
			attributes: ["criteriaId", "criteriaCode", "measurementMethod"],
		});
		// Tính toán chỉ số và tạo dữ liệu cho CompanyMetric
		for (let criteria of criterias) {
			const { criteriaId, criteriaCode, measurementMethod } = criteria;
			const metric = await QuestionAction.calculateMetric(
				measurementMethod,
				answers
			);
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
