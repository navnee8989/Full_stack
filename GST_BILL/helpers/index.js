const axios = require("axios");
// const { FinalGST } = require("../models");
const {Lastpayer} = require("../models");
// Adjust the path as necessary
// const Sequelize = require("sequelize");
// const { FullGST } = require("../models");
// const {FullDataPayer} = require("../models/");
// const {FinalGST} = require("../models");

const fetchData = async (gstin) => {
  let data = JSON.stringify({
    tkn: "hs8175a9d5-8aa5-438e-8f2e-e6d7d8a1b915/1",
    trkr: "UW-qN20240604052401",
    lang: "en",
    usrid: "4022690236",
    mode: "web",
    pltfrm: "windows",
    did: null,
    deptid: "63",
    srvid: "559",
    gstin: gstin,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://apigw.umangapp.in/GSTNApi/ws1/searchtaxpayer",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0",
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      Referer: "https://web.umang.gov.in/",
      formtrkr: "0",
      tenantId: "",
      "x-api-key": "VKE9PnbY5k1ZYapR5PyYQ33I26sXTX569Ed7eqyg",
      deptId: "63",
      srvid: "559",
      subsid: "0",
      subsid2: "0",
      "Content-Type": "application/json",
      Origin: "https://web.umang.gov.in",
      Connection: "keep-alive",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
      TE: "trailers",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    const decodedData = response.data.pd.decodedData;
    // console.log(decodedData);

    const gstin = decodedData.gstin;
    // console.log(gstin);
    const stjCd = decodedData.stjCd || "";
    const dty = decodedData.dty;
    const lgnm = decodedData.lgnm;
    const stj = decodedData.stj || "";
    const lstupdt = new Date(
      decodedData.lstupdt.split("/").reverse().join("-")
    );
    const ctb = decodedData.ctb;
    const rgdt = new Date(decodedData.rgdt.split("/").reverse().join("-"));
    const tradeNam = decodedData.tradeNam;
    const sts = decodedData.sts;
    const ctjCd = decodedData.ctjCd || "";
    // console.log(ctjCd);
    const ctj = decodedData.ctj || "";
    const einvoiceStatus = decodedData.einvoiceStatus;

    const addresses = [];
    if (decodedData.pradr) {
      addresses.push([decodedData.pradr, "parmnent"]);
    }
    if (decodedData.adadr) {
      decodedData.adadr.forEach((addr) => addresses.push([addr, "additional"]));
    }

    // console.log(addresses);
    // const [addressData, additional] = addresses;
    // console.log(addressData);
    // console.log(additional);
    for (const [addressData, addressType] of addresses) {
      const addr = addressData.addr || {};
      // console.log(addr);
      const bnm = addr.bnm || "";
      const loc = addr.loc || "";
      const st = addr.st || "";
      const bno = addr.bno || "";
      const dst = addr.dst || "";
      const lt = addr.lt || "";
      const locality = addr.locality || "";
      const pncd = addr.pncd || "";
      const landMark = addr.landMark || "";
      const stcd = addr.stcd || "";
      // console.log(stcd);
      const geocodelvl = addr.geocodelvl || "";
      const flno = addr.flno || "";
      const lg = addr.lg || "";
      const ntr = addressData.ntr || "";
      console.log(ntr);

      await Lastpayer.upsert({
        gstin,
        addr_type: addressType,
        bnm,
        loc,
        st,
        bno,
        dst,
        lt,
        locality,
        pncd,
        landMark,
        stcd,
        geocodelvl,
        flno,
        lg,
        ntr,
        stjCd,
        dty,
        lgnm,
        stj,
        lstupdt,
        ctb,
        rgdt,
        tradeNam,
        sts,
        ctjCd,
        ctj,
        einvoiceStatus,
      });
    }

    console.log("Data inserted into MySQL successfully.");
  } catch (error) {
    console.error("Error occurred while inserting data into MySQL:", error);
  }
};

module.exports = { fetchData };

// const axios = require("axios");
// const full_data_payer = require("../models/full_data_payer");
// const { Taxpayer } = require("../models");
// const { AdditionalAddress } = require("../models");
// const { PrimaryAddress } = require("../models");
// const { full_data_payer } = require("../models");
// const {fullAddress} = require("../models");

// const fetchData = async (gstin) => {
//   let data = JSON.stringify({
//     tkn: "hs8175a9d5-8aa5-438e-8f2e-e6d7d8a1b915/1",
//     trkr: "UW-qN20240604052401",
//     lang: "en",
//     usrid: "4022690236",
//     mode: "web",
//     pltfrm: "windows",
//     did: null,
//     deptid: "63",
//     srvid: "559",
//     gstin: gstin,
//   });

//   let config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: "https://apigw.umangapp.in/GSTNApi/ws1/searchtaxpayer",
//     headers: {
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0",
//       Accept: "application/json, text/plain, */*",
//       "Accept-Language": "en-US,en;q=0.5",
//       "Accept-Encoding": "gzip, deflate, br, zstd",
//       Referer: "https://web.umang.gov.in/",
//       formtrkr: "0",
//       tenantId: "",
//       "x-api-key": "VKE9PnbY5k1ZYapR5PyYQ33I26sXTX569Ed7eqyg",
//       deptId: "63",
//       srvid: "559",
//       subsid: "0",
//       subsid2: "0",
//       "Content-Type": "application/json",
//       Origin: "https://web.umang.gov.in",
//       Connection: "keep-alive",
//       "Sec-Fetch-Dest": "empty",
//       "Sec-Fetch-Mode": "cors",
//       "Sec-Fetch-Site": "cross-site",
//       TE: "trailers",
//     },
//     data: data,
//   };

//   try {
//     const response = await axios(config);
//     const gstData = response.data.pd.decodedData;
//     // console.log(gstData);

//     const additionalAddressData = gstData.adadr;
//     console.log(additionalAddressData);
//     const primaryAddressData = gstData.pradr;

//     let formattedLstupdt = null;
//     if (gstData.lstupdt) {
//       const [day, month, year] = gstData.lstupdt.split("/");
//       formattedLstupdt = new Date(`${year}-${month}-${day}`)
//         .toISOString()
//         .split("T")[0];
//     }

//     let formattedRgdt = null;
//     if (gstData.rgdt) {
//       const [day, month, year] = gstData.rgdt.split("/");
//       formattedRgdt = new Date(`${year}-${month}-${day}`)
//         .toISOString()
//         .split("T")[0];
//     }

// Upsert the taxpayer data
// await Taxpayer.upsert({
//   gstin: gstData.gstin,
//   lgnm: gstData.lgnm,
//   stjCd: gstData.stjCd,
//   stj: gstData.stj,
//   dty: gstData.dty,
//   lstupdt: formattedLstupdt,
//   rgdt: formattedRgdt,
//   ctb: gstData.ctb,
//   tradeNam: gstData.tradeNam,
//   sts: gstData.sts,
//   ctjCd: gstData.ctjCd,
//   ctj: gstData.ctj,
//   einvoiceStatus: gstData.einvoiceStatus,
// });

// Upsert the primary address data
// if (primaryAddressData && primaryAddressData.addr) {
//   const pdAddr = primaryAddressData.addr;
//   await PrimaryAddress.upsert({
//     gstin: gstData.gstin,
//     AddressType: "Principal",
//     bnm: pdAddr.bnm,
//     loc: pdAddr.loc,
//     st: pdAddr.st,
//     bno: pdAddr.bno,
//     dst: pdAddr.dst,
//     lt: pdAddr.lt,
//     locality: pdAddr.locality,
//     pncd: pdAddr.pncd,
//     landMark: pdAddr.landMark,
//     stcd: pdAddr.stcd,
//     geocodelvl: pdAddr.geocodelvl,
//     flno: pdAddr.flno,
//     lg: pdAddr.lg,
//     ntr: pdAddr.ntr,
//   });
// }

// Upsert the additional addresses data
// if (additionalAddressData) {
//   for (const addrObj of additionalAddressData) {
//     const addr = addrObj.addr;
//     await AdditionalAddress.upsert({
//       gstin: gstData.gstin,
//       AddressType: "Additional",
//       bnm: addr.bnm,
//       loc: addr.loc,
//       st: addr.st,
//       bno: addr.bno,
//       dst: addr.dst,
//       lt: addr.lt,
//       locality: addr.locality,
//       pncd: addr.pncd,
//       landMark: addr.landMark,
//       stcd: addr.stcd,
//       geocodelvl: addr.geocodelvl,
//       flno: addr.flno,
//       lg: addr.lg,
//       ntr: addr.ntr,
//     });
//   }
// }

// Create full_data_payer

// Upsert the full address data

// const fullAddressData = [...primaryAddressData, ...additionalAddressData];

// await fullAddress.bulkCreate(
//   fullAddressData.map((addr) => ({
//     gstin: gstData.gstin,

//     AddressType: addr.AddressType,

//     bnm: addr.bnm,

//     loc: addr.loc,

//     st: addr.st,

//     bno: addr.bno,

//     dst: addr.dst,

//     lt: addr.lt,

//     locality: addr.locality,

//     pncd: addr.pncd,

//     landMark: addr.landMark,

//     stcd: addr.stcd,

//     geocodelvl: addr.geocodelvl,

//     flno: addr.flno,

//     lg: addr.lg,

//     ntr: addr.ntr,
//   }))
// );
//     console.log("Data fetched and stored successfully");
//   } catch (error) {
//     console.error("Error fetching or storing data:", error);
//   }
// };

// module.exports = { fetchData };
