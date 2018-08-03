// create table model
// the name blob is arbitrary. We can change it later.

module.exports = function (sequelize, DataTypes) {
    var Blob = sequelize.define("Blob", {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        routeName: DataTypes.STRING,
        isPublic: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
        pssw: DataTypes.STRING,
    });
    return Blob;
};
