import { DataTypes, Model } from 'sequelize';
import db from '../connexion';
import Team from './Team';
import Hotel from './Hotel';

class Visit extends Model {
  public id!: number;
  public rate!: number;
  public date!: string;
  public status!: number;
}

Visit.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: true,
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    underscored: true,
    modelName: 'visit',
    sequelize: db,
  },
);

Visit.belongsTo(Team);
Team.hasMany(Visit);

export default Visit;
