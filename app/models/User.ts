const { Model, DataTypes } = require('sequelize');


class User extends Model {
    public user_id!: number;
    public user_name!: string;
    public user_lastname!: string;
    public user_email!: string;
    public user_password!: string;
}

User.init({
    user_id: {
        type: new DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    user_lastname: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    user_email: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },

}, {
    tableName: 'user',
    sequelize: require('../connexion')
})

module.exports = User;