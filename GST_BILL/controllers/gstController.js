const {Taxpayer} = require('../models');

console.log("Controller");
const gstController = async (req, res) => {
  try {
   

    // Find taxpayer in the database based on GSTIN
    // const taxpayer = await Taxpayer.findAll()

    // console.log(taxpayer);
    // Check if taxpayer is found
    // if (!taxpayer) {
    //   return res.status(404).json({ success: false, message: 'Taxpayer not found' });
    // }

    // If taxpayer is found, send it in the response
    // res.status(200).json({ success: true, taxpayer });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error in gstController:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};









module.exports = { gstController };
