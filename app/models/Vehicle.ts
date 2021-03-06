import { DataTypes, Model } from 'sequelize';
import db from '../connexion';
import Parking from './Parking';
import Team from './Team';

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
        is: /[a-zA-z]{2}-\d{3}-[a-zA-z]{2}/,
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
Parking.hasMany(Vehicle);

Team.hasOne(Vehicle);
Vehicle.belongsTo(Team);

export default Vehicle;
