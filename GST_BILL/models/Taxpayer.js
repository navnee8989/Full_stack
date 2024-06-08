

module.exports = (sequelize, DataTypes) => {
  const Taxpayer = sequelize.define(
    "Taxpayer",
    {
      gstin: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true,
      },
      lgnm: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stjCd: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stj: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dty: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lstupdt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      rgdt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ctb: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tradeNam: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sts: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ctjCd: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ctj: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      einvoiceStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "taxpayer",
      timestamps: false,
    }
  );

 

  return Taxpayer;
};
