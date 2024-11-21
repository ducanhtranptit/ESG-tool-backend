import model from "../models/index.js";
import UserService from "../services/user.services.js";
import QuestionAction from "./questions.action.js";

export default class ReportActions {
	static async getAllDataForReport(year, userId) {
		const companyInfor = await UserService.getCompanyInfor(userId);
		const companyIndustry = await model.Industry.findOne({
			where: {
				level2: companyInfor.industryCodeLevel2,
			},
			raw: true,
		});

		const companyOverallInfor = await model.OverallInfor.findOne({
			where: { userId: userId },
			raw: true,
		});

		const revenue = await model.Answer.findOne({
			where: {
				questionCode: "AS001",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});

		const profitAfterTax = await model.Answer.findOne({
			where: {
				questionCode: "AS002",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});

		const fulltimeEmployees = await model.Answer.findOne({
			where: {
				questionCode: "AS004",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});

		const totalRecyclePackage = await model.Answer.findOne({
			where: {
				questionCode: "AS009",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});

		const recycleEnergy = await model.Answer.findOne({
			where: {
				questionCode: "AS022",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});

		const recycleWater = await model.Answer.findOne({
			where: {
				questionCode: "AS027",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});
		const wasteReduction = await model.Answer.findOne({
			where: {
				questionCode: "AS013",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});
		const totalEmployee = await model.Answer.findOne({
			where: {
				questionCode: "AS082",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});
		const satisfactionScore = await model.Answer.findOne({
			where: {
				questionCode: "AS103",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});
		const trainingExpenditure = await model.Answer.findOne({
			where: {
				questionCode: "AS136",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});
		const socialExpenditure = await model.Answer.findOne({
			where: {
				questionCode: "AS076",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});
		const socialActivityPerEmployeeEachYear = await model.Answer.findOne({
			where: {
				questionCode: "AS075",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});
		const newEmployee = await model.Answer.findOne({
			where: {
				questionCode: "AS091",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});
		const industrialAccident = await model.Answer.findOne({
			where: {
				questionCode: "AS099",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});
		const independentMemberOnBodRatio = await model.Answer.findOne({
			where: {
				questionCode: "AS157",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer"],
			raw: true,
		});

		const answersOfCompany = await model.Answer.findAll({
			where: {
				companyCode: companyInfor.companyCode,
				year: year,
			},
			attributes: ["questionCode", "answer"],
			raw: true,
		});
		const waterComsume = await QuestionAction.calculateMetric(
			"(AS018+AS019)/AS194",
			answersOfCompany
		);

		const percentRecycleWater = await QuestionAction.calculateMetric(
			"AS027/((AS018+AS019)/(AS194))",
			answersOfCompany
		);

		const totalWaste = await QuestionAction.calculateMetric(
			"AS011 +12+13+15",
			answersOfCompany
		);

		const recycleRatioWaste = await QuestionAction.calculateMetric(
			"(AS013/(AS011 +12+13+15))*100",
			answersOfCompany
		);

		const recyclePakageRatio = await QuestionAction.calculateMetric(
			"(AS009/(AS009+AS008))*100",
			answersOfCompany
		);

		const electricEnergy = await QuestionAction.calculateMetric(
			"(AS021+AS022+AS023)",
			answersOfCompany
		);

		const energyPerRevenue = await QuestionAction.calculateMetric(
			"(AS021+AS022+AS023)/AS001",
			answersOfCompany
		);

		const tapWater = await QuestionAction.calculateMetric(
			"(AS018+AS019)/AS194",
			answersOfCompany
		);

		const femaleCLevel = await QuestionAction.calculateMetric(
			"AS086/(AS085+AS086)*100",
			answersOfCompany
		);

		const femaleManager = await QuestionAction.calculateMetric(
			"AS088/(AS088+AS087)*100",
			answersOfCompany
		);

		const femaleStaff = await QuestionAction.calculateMetric(
			"AS090/(AS090+AS089)*100",
			answersOfCompany
		);

		const foreignStaffRation = await QuestionAction.calculateMetric(
			"AS193/(AS082)*100",
			answersOfCompany
		);

		const disableEmployeeRatio = await QuestionAction.calculateMetric(
			"AS141/(AS082)*100",
			answersOfCompany
		);

		const differenceSalaryCLevel = await QuestionAction.calculateMetric(
			"(AS093-AS094)/AS093*100",
			answersOfCompany
		);

		const differenceSalaryManager = await QuestionAction.calculateMetric(
			"(AS095-AS096)/AS095*100",
			answersOfCompany
		);

		const differenceSalaryStaff = await QuestionAction.calculateMetric(
			"(AS097-AS098)/AS097*100",
			answersOfCompany
		);

		const percentEmployeeInUnion = await QuestionAction.calculateMetric(
			"AS081/(AS082)*100",
			answersOfCompany
		);

		const industryialAccidentRatio = await QuestionAction.calculateMetric(
			"AS099/(AS082)*100",
			answersOfCompany
		);

		const mortalityRatio = await QuestionAction.calculateMetric(
			"AS100/(AS082)*100",
			answersOfCompany
		);

		const rateWorkersOccupationalDiseases =
			await QuestionAction.calculateMetric(
				"AS101/(AS082)*100",
				answersOfCompany
			);

		const averageTrainingHoursPerEmployees =
			await QuestionAction.calculateMetric(
				"AS40/AS082",
				answersOfCompany
			);

		const percentEmployeeTrain = await QuestionAction.calculateMetric(
			"AS135/AS082*100",
			answersOfCompany
		);

		const newEmployeeRate = await QuestionAction.calculateMetric(
			"(AS091/AS082)*100",
			answersOfCompany
		);

		const industrialAccidentRatio = await QuestionAction.calculateMetric(
			"(AS099/AS082)*100",
			answersOfCompany
		);

		const totalOfBod = await QuestionAction.calculateMetric(
			"AS189+AS190",
			answersOfCompany
		);

		const maleBod = await QuestionAction.calculateMetric(
			"AS190/(AS189+AS190)*100",
			answersOfCompany
		);

		const femaleBod = await QuestionAction.calculateMetric(
			"AS189/(AS189+AS190)*100",
			answersOfCompany
		);

		const increaseRevenue = await ReportActions.calculateIncreaseRevenue(
			year
		);

		const reductionEnergyComparePreviousYear =
			await ReportActions.calculateReductionEnergyComparePreviousYear(
				year,
				companyInfor
			);

		const surveyFrequency = await ReportActions.calculateSurveyFrequency(
			year,
			companyInfor
		);

		const result = {
			year: year,
			name: companyInfor.companyName,
			industryName: companyIndustry.industryName,
			dateFounded: companyOverallInfor.dateFounder,
			mainAddress: companyOverallInfor.mainAddress,
			companySector: companyOverallInfor.companySector,
			revenue: revenue.answer,
			profitAfterTax: profitAfterTax.answer,
			fulltimeEmployees: fulltimeEmployees.answer,
			totalRecyclePackage: totalRecyclePackage.answer,
			recycleEnergy: recycleEnergy.answer,
			recycleWater: recycleWater.answer,
			wasteReduction: wasteReduction.answer,
			totalEmployee: totalEmployee.answer,
			satisfactionScore: satisfactionScore.answer,
			trainingExpenditure: trainingExpenditure.answer,
			socialExpenditure: socialExpenditure.answer,
			socialActivityPerEmployeeEachYear:
				socialActivityPerEmployeeEachYear.answer,
			newEmployee: newEmployee.answer,
			industrialAccident: industrialAccident.answer,
			independentMemberOnBodRatio: independentMemberOnBodRatio.answer,
			waterComsume: waterComsume,
			percentRecycleWater: percentRecycleWater,
			totalWaste: totalWaste,
			recycleRatioWaste: recycleRatioWaste,
			recyclePakageRatio: recyclePakageRatio,
			electricEnergy: electricEnergy,
			energyPerRevenue: energyPerRevenue,
			tapWater: tapWater,
			femaleCLevel: femaleCLevel,
			femaleManager: femaleManager,
			femaleStaff: femaleStaff,
			foreignStaffRation: foreignStaffRation,
			disableEmployeeRatio: disableEmployeeRatio,
			differenceSalaryCLevel: differenceSalaryCLevel,
			differenceSalaryManager: differenceSalaryManager,
			differenceSalaryStaff: differenceSalaryStaff,
			percentEmployeeInUnion: percentEmployeeInUnion,
			industryialAccidentRatio: industryialAccidentRatio,
			mortalityRatio: mortalityRatio,
			rateWorkersOccupationalDiseases: rateWorkersOccupationalDiseases,
			averageTrainingHoursPerEmployees: averageTrainingHoursPerEmployees,
			percentEmployeeTrain: percentEmployeeTrain,
			newEmployeeRate: newEmployeeRate,
			industrialAccidentRatio: industrialAccidentRatio,
			totalOfBod: totalOfBod,
			maleBod: maleBod,
			femaleBod: femaleBod,
			increaseRevenue: increaseRevenue,
			reductionEnergyComparePreviousYear:
				reductionEnergyComparePreviousYear,
			surveyFrequency: surveyFrequency,
		};
		return result;
	}

	static async calculateIncreaseRevenue(year) {
		const revenueCurrentYear = await model.Answer.findOne({
			where: {
				year: year,
				questionCode: "AS001",
			},
			attributes: ["answer"],
			raw: true,
		});

		const revenueLastYear = await model.Answer.findOne({
			where: {
				year: (parseInt(year) - 1).toString(),
				questionCode: "AS001",
			},
			attributes: ["answer"],
			raw: true,
		});

		if (!revenueCurrentYear || !revenueLastYear) {
			return "###";
		}

		const increaseRevenue =
			((revenueCurrentYear.answer - revenueLastYear.answer) /
				revenueLastYear.answer) *
			100;

		return increaseRevenue;
	}

	static async calculateReductionEnergyComparePreviousYear(
		year,
		companyInfor
	) {
		const answersOfCompanyCurrentYear = await model.Answer.findAll({
			where: {
				companyCode: companyInfor.companyCode,
				year: year,
			},
			attributes: ["questionCode", "answer"],
			raw: true,
		});

		const answersOfCompanyLastYear = await model.Answer.findAll({
			where: {
				companyCode: companyInfor.companyCode,
				year: (parseInt(year) - 1).toString(),
			},
			attributes: ["questionCode", "answer"],
			raw: true,
		});

		const electricEnergyCurrentYear = await QuestionAction.calculateMetric(
			"AS021+AS022+AS023",
			answersOfCompanyCurrentYear
		);

		const electricEnergyLastYear = await QuestionAction.calculateMetric(
			"AS021+AS022+AS023",
			answersOfCompanyLastYear
		);

		const reductionEnergyComparePreviousYear =
			(electricEnergyCurrentYear - electricEnergyLastYear) /
			electricEnergyLastYear;

		return reductionEnergyComparePreviousYear;
	}

	static async calculateSurveyFrequency(year, companyInfor) {
		const answerSurveyFrequency = await model.Answer.findOne({
			where: {
				questionCode: "AS102",
				year: year,
				companyCode: companyInfor.companyCode,
			},
			attributes: ["answer", "questionCode"],
		});

		const dummyRecord = await model.Dummy.findOne({
			where: {
				questionCode: answerSurveyFrequency.questionCode,
				answer: answerSurveyFrequency.answer,
			},
			raw: true,
		});

		const answerNameRecord = await model.Question.findOne({
			where: {
				questionCode: answerSurveyFrequency.questionCode,
			},
			attributes: [`answer${dummyRecord.answer}`],
			raw: true,
		});

		return answerNameRecord[`answer${dummyRecord.answer}`];
	}
}
