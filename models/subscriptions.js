module.exports = function (sequelize, DataTypes) {
    var Subscriptions = sequelize.define("Subscriptions", {
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
    Subscriptions.associate = function (models) {
        Subscriptions.belongsTo(
            models.Users, {
            foreignKey: {
                allowNull: true
            }
        });
        Subscriptions.belongsTo(
            models.Transactions, {
            foreignKey: {
                allowNull: true
            }
        });
    }
    return Subscriptions;
}