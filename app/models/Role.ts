import { DataTypes, Model } from 'sequelize';
import db from '../connexion';

class Role extends Model {
  public id!: number;
  public name!: string;
  public level!: string;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    modelName: 'role',
    sequelize: db,
  },
);

export default Role;
