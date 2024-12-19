import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class CriteriaItem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	CriteriaItem.init(
		{
			itemId: DataTypes.INTEGER,
			criteriaId: DataTypes.INTEGER,
			IChart: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "CriteriaItem",
		}
	);
	return CriteriaItem;
};
