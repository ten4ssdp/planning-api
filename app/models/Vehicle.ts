import { DataTypes, Model } from 'sequelize';
import db from '../connexion';
import Parking from './Parking';

class Vehicle extends Model {
  public id!: number;
  public numberPlate!: string;
  public type!: string;
}

Vehicle.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    numberPlate: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    underscored: true,
    modelName: 'vehicle',
    sequelize: db,
  },
);

Vehicle.belongsTo(Parking);

export default Vehicle;
