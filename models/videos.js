module.exports = function (sequelize, DataTypes) {
    var Videos = sequelize.define("Videos", {
        videoName: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            }
        },
        imgURL: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            }
        }, 
        videoDescription: {
            type: DataTypes.STRING
        }
    });
    Videos.associate = function (models) {
        Videos.belongsTo(
            models.VideoCategories, {
            foreignKey: {
                allowNull: true
            }
        });
    }
    return Videos;
}