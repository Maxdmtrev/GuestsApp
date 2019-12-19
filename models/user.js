const mongoose = require('mongoose');
// Model for User base
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    date: String,
    status: false
});
// userSchema.statics.finder = async function() {
//     return this.find().sort('date');
// }
module.exports = mongoose.model('Users', userSchema);