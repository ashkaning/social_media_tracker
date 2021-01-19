module.exports = function (sequelize, DataTypes) {
    var Transactions = sequelize.define("Transactions", {
        price: {
            type: DataTypes.DataTypes.DECIMAL(10, 2),
            validate: {
                isDecimal: true,
                allowNull: false,
                field: 'itemPrice'
            }
        },
        status: {
            type: DataTypes.STRING,
            validate: {
                len: [6, 7]
            }
        },
        paymentMethod: {
            type: DataTypes.STRING
        }
    })
    Transactions.associate = function (models) {
        Transactions.belongsTo(models.Users, {
            foreignKey: {
                allowNull: true
            }
        })
    }
    return Transactions;
}