const mongoose = require('mongoose'); 

const employeeSchema = mongoose.Schema( {
  name: {type: String}, 
  position: {type:String},
  office: {type: String},
  salary: {type:Number}
},);

module.exports = mongoose.model('Employee', employeeSchema);