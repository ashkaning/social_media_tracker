module.exports = function (sequelize, DataTypes) {
    var VideoCategories = sequelize.define("VideoCategories", {
        videoCategoriesName: {
            type: DataTypes.STRING
        }
    })
    return VideoCategories;
}