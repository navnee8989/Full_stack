// models/full_data_payer.js
module.exports = (sequelize, DataTypes) => {
    const FInalGST = sequelize.define(
      "FInalGST",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        gstin: {
          type: DataTypes.STRING,
          allowNull: true,
          primaryKey: true
        },
        addr_type: {
          type: DataTypes.STRING,
          allowNull: false
        },
        bnm: {
          type: DataTypes.STRING,
          allowNull: true
        },
        loc: {
          type: DataTypes.STRING,
          allowNull: true
        },
        st: {
          type: DataTypes.STRING,
          allowNull: true
        },
        bno: {
          type: DataTypes.STRING,
          allowNull: true
        },
        dst: {
          type: DataTypes.STRING,
          allowNull: true
        },
        lt: {
          type: DataTypes.STRING,
          allowNull: true
        },
        locality: {
          type: DataTypes.STRING,
          allowNull: true
        },
        pncd: {
          type: DataTypes.STRING,
          allowNull: true
        },
        landMark: {
          type: DataTypes.STRING,
          allowNull: true
        },
        stcd: {
          type: DataTypes.STRING,
          allowNull: true
        },
        geocodelvl: {
          type: DataTypes.STRING,
          allowNull: true
        },
        flno: {
          type: DataTypes.STRING,
          allowNull: true
        },
        lg: {
          type: DataTypes.STRING,
          allowNull: true
        },
        ntr: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        stjCd: {
          type: DataTypes.STRING,
          allowNull: true
        },
        dty: {
          type: DataTypes.STRING,
          allowNull: true
        },
        lgnm: {
          type: DataTypes.STRING,
          allowNull: true
        },
        stj: {
          type: DataTypes.STRING,
          allowNull: true
        },
        cxdt: {
          type: DataTypes.DATE,
          allowNull: true
        },
        lstupdt: {
          type: DataTypes.DATE,
          allowNull: true
        },
        ctb: {
          type: DataTypes.STRING,
          allowNull: true
        },
        rgdt: {
          type: DataTypes.DATE,
          allowNull: true
        },
        tradeNam: {
          type: DataTypes.STRING,
          allowNull: true
        },
        sts: {
          type: DataTypes.STRING,
          allowNull: true
        },
        ctjCd: {
          type: DataTypes.STRING,
          allowNull: true
        },
        ctj: {
          type: DataTypes.STRING,
          allowNull: true
        },
        einvoiceStatus: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },{
        tableName: "finalgsts",
        timestamps: false,
      }
    );
  
    return FInalGST;
  };
  