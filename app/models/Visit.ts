import { DataTypes, Model } from 'sequelize';
import db from '../connexion';
import Team from './Team';
import Hotel from './Hotel';
import { getUsersFromTeam } from 'app/mickey/functions/teams';

class Visit extends Model {
  public id!: number;
  public rate!: number;
  public date!: string;
  public status!: number;
  public hotelId!: number;
  public isUrgent!: boolean;
  public description!: boolean;
  public start!: Date;
  public end!: Date;
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
      type: DataTypes.DATEONLY,
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
    isUrgent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: true,
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
