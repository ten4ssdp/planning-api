import { DataTypes, Model } from 'sequelize';
import db from '../connexion';
import Role from './Role';
import Sector from './Sector';
import TeamComposition from './TeamComposition';
import Team from './Team';

class User extends Model {
  public id!: number;
  public name!: string;
  public lastname!: string;
  public email!: string;
  public password!: string;
  public address!: string;
}

User.init(
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
    lastname: {
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
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    underscored: true, // cette option permet de nommer automatiquement les attributs sous la forme "nom_attribut" (user_name, user_password, etc)
    modelName: 'user',
    sequelize: db,
  },
);

// sauvegrade de valeur retournée par l'association, comme ça on peut la réutiliser plus tard
User.belongsTo(Role);
User.belongsTo(Sector);
User.belongsToMany(Team, { through: TeamComposition });

export default User;
