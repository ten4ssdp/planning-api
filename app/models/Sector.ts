import { DataTypes, Model } from 'sequelize';
import db from '../connexion';
import Team from './Team';

class Sector extends Model {
  public id!: number;
  public name!: string;
}

Sector.init(
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
  },
  {
    underscored: true,
    modelName: 'sector',
    sequelize: db,
  },
);

Sector.hasMany(Team);
Team.belongsTo(Sector);

export default Sector;
