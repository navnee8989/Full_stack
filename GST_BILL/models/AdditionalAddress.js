const {Taxpayer} = require("./Taxpayer");


module.exports = (sequelize, DataTypes) => {
  const AdditionalAddress = sequelize.define(
    "AdditionalAddress",
    {
      gstin: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      AddressType: {
        type: "additional",
        allowNull: false
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
      tableName: "additional_address",
      timestamps: false,
    }
  );



  
  return AdditionalAddress;
};
