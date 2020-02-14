(function(){
    const { DataTypes, Model } = require('sequelize');
    const sequelize = require('../connexion');

    const Role = require('./Role');

    class User extends Model {
        public id!: number;
        public name!: string;
        public lastname!: string;
        public email!: string;
        public role!: string;
        public password!: string;
    }
    
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
            notEmpty: true,
        },
        lastname: {
            type: DataTypes.STRING(128),
            allowNull: false,
            notEmpty: true,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            isEmail: true,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
    }, {
        underscored: true, // cette option permet de nommer automatiquement les attributs sous la forme "nom_attribut" (user_name, user_password, etc)
        modelName: 'user',
        sequelize
    })

    // sauvegrade de valeur retournée par l'association, comme ça on peut la réutiliser plus tard
    Role.User = User.belongsTo(Role);

    sequelize.sync()
    .then(() => User.create({
        name: "Maxime",
        lastname: "Oger",
        email: "maxime.oger@hetic.net",
        password: "1234",
        role: {
            name: "planifier",
            level: "1"
        }
    }, {
        include: [{association: Role.User}]
    }))
    .then(user => console.log(user.toJSON()))
    .catch(err => {throw err})
    
    module.exports = User;
})()
