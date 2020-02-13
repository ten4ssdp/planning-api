(function(){
    const { DataTypes, Model } = require('sequelize');
    const sequelize = require('../connexion');

    const Role = require('./Role');

    class User extends Model {
        public id!: number;
        public user_name!: string;
        public user_lastname!: string;
        public user_email!: string;
        public user_role!: string;
        public user_password!: string;
    }
    
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_name: {
            type: DataTypes.STRING(128),
            allowNull: false,
            notEmpty: true,
        },
        user_lastname: {
            type: DataTypes.STRING(128),
            allowNull: false,
            notEmpty: true,
        },
        user_email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            isEmail: true,
        },
    }, {
        underscored: true,
        modelName: 'user',
        sequelize
    })

    User.belongsTo(Role);

    sequelize.sync()
    .then(() => User.create({
        user_name: "Maxime",
        user_lastname: "Oger",
        user_email: "maxime.oger@hetic.net",
        user_password: "1234"
    }))
    .then(user => console.log(user.toJSON()))
    .catch(err => {throw err})
    
    module.exports = User;
})()
