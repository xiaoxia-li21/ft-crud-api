const mongoose = require('mongoose');

const { Schema } = mongoose;
const companyModel = new Schema({
  company_name: { type: String },
  year_founded: { type: String },
  revenue: { type: String }
});

module.exports = mongoose.model('Company', companyModel);
