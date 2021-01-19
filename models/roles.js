module.exports = function (sequelize, DataTypes) {
    var Roles = sequelize.define("Roles", {
        roleName: {
            type: DataTypes.STRING,
            validate: {
                isAlphanumeric: true
            }
        },
        roleDescription: {
            type: DataTypes.STRING,
        }
    })
    return Roles;
}