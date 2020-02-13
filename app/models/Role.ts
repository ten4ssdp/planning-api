(function(){
    const { DataTypes, Model } = require('sequelize');

    const sequelize = require('../connexion');

    class Role extends Model {
        public id! : number;
        public role_name! : string;
        public role_level! : string; 
    }

    Role.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        role_name: {
            type: DataTypes.STRING(128),
            allowNull: false,
            notEmpty: true,
        },
        role_level: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true,
        modelName: 'role',
        sequelize
    })

    sequelize.sync()
    .then(() => Role.create({
        role_name: "planifier",
        role_level: 1 
    }))
    .then(role => console.log(role.toJSON()))
    .catch(err => {throw err});

    module.exports = Role
})()