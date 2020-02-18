import { DataTypes, Model } from 'sequelize';
import db from '../connexion';
import Vehicle from './Vehicle';

class Parking extends Model {
  public id!: number;
  public address!: string;
  public zipCode!: number;
  public city!: string;
}

Parking.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    city: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    underscored: true,
    modelName: 'parking',
    sequelize: db,
  },
);

export default Parking;
