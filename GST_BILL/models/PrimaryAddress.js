const AdditionalAddress = require("./AdditionalAddress");
const Taxpayer = require("./Taxpayer");

module.exports = (sequelize, DataTypes) => {
  const PrimaryAddress = sequelize.define(
    "PrimaryAddress",
    {
      gstin: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      AddressType: {
        type: "Primary",
        allowNull: false,
      },
      bnm: DataTypes.STRING,
      loc: DataTypes.STRING,
      st: DataTypes.STRING,
      bno: DataTypes.STRING,
      dst: DataTypes.STRING,
      lt: DataTypes.STRING,
      locality: DataTypes.STRING,
      pncd: DataTypes.STRING,
      landMark: DataTypes.STRING,
      stcd: DataTypes.STRING,
      geocodelvl: DataTypes.STRING,
      flno: DataTypes.STRING,
      lg: DataTypes.STRING,
      ntr: DataTypes.STRING,
    },
    {
      tableName: "primary_address",
      timestamps: false,
    }
  );

 
  return PrimaryAddress;
};
