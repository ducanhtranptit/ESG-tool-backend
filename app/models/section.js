import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Section extends Model {
		static associate(models) {}
	}
	Section.init(
		{
			sectionName: DataTypes.STRING,
			sectionId: DataTypes.INTEGER,
			submitCount: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Section",
		}
	);
	return Section;
};
