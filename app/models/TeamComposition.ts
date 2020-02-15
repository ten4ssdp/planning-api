import { DataTypes, Model } from 'sequelize';
import db from '../connexion';

class TeamComposition extends Model {
  public id!: number;
  public date!: Date;
}

TeamComposition.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    underscored: true,
    modelName: 'team_composition',
    sequelize: db,
  },
);

export default TeamComposition;
