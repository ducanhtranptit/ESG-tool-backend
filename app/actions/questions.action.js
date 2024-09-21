import model from "../models/index.js";

export default class QuestionAction {
	static async calculateMetric(mesurementMethod, dictionary) {
		const regex = /AS\d+/g;
		if (mesurementMethod === null || dictionary === null) return null;
		const matches = mesurementMethod.match(regex);
		let evalString = mesurementMethod;
		matches.forEach((code) => {
			const entry = dictionary.find((item) => item.questionCode === code);
			if (entry && entry.answer !== undefined) {
				evalString = evalString.replace(
					new RegExp(code, "g"),
					entry.answer
				);
			}
		});
		const result = eval(evalString);
		return result;
	}

	static async getAllTopicsAndQuestions() {
		const topics = await model.Topic.findAll({
			attributes: ["topicCode", "name", "answerGuide"],
		});

		const questions = await model.Question.findAll({
			attributes: ["questionCode", "topicCode", "name"],
		});

		return {
			topics,
			questions,
		};
	}

	static async addAnswerAndCalculateMetricOfCompany(
		companyCode,
		year,
		answers
	) {
		for (let answer of answers) {
			const { questionCode, answer: answerValue } = answer;
			await model.Answer.create({
				companyCode: companyCode,
				year: year,
				questionCode: questionCode,
				answer: answerValue,
			});
		}

		const company = await model.Company.findOne({
			where: { companyCode },
			attributes: ["industryCodeLevel3"],
		});
		const industryCodeLevel3 = company.dataValues.industryCodeLevel3;
		const criterias = await model.Criteria.findAll({
			whrer: {
				applicableIndustryCode: industryCodeLevel3,
			},
			attributes: ["criteriaId", "criteriaCode", "measurementMethod"],
		});
		for (let criteria of criterias) {
			const { criteriaId, criteriaCode, measurementMethod } = criteria;
			const metric = await QuestionAction.calculateMetric(
				measurementMethod,
				answers
			);
			await model.CompanyMetric.create({
				companyCode,
				year,
				metric,
				criteriaId,
				criteriaCode,
			});
		}
	}
}
