import { DataTypes, Model } from 'sequelize';
import db from '../connexion';
import Sector from './Sector';
import Vehicle from './Vehicle';

class Team extends Model {
  public id!: number;
  public name!: string;
}

Team.init(
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
  },
  {
    underscored: true,
    modelName: 'team',
    sequelize: db,
  },
);


export default Team;
