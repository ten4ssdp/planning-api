import { DataTypes, Model } from 'sequelize';
import db from '../connexion';
import Sector from './Sector';
import Visit from './Visit';

class Hotel extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
  public zipCode!: number;
  public city!: string;
  public roomCount!: number;
  public visits?: Visit[];
}

Hotel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.STRING(128),
      allowNull: false,
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
    roomCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    underscored: true, // cette option permet de nommer automatiquement les attributs sous la forme "nom_attribut" (user_name, user_password, etc)
    modelName: 'hotel',
    sequelize: db,
  },
);

Hotel.belongsTo(Sector);
Sector.hasMany(Hotel);

Hotel.hasMany(Visit);
Visit.belongsTo(Hotel);

export default Hotel;
