const mongoose = require('mongoose');
// Model for Admin base
const adminSchema = new mongoose.Schema({
    login: String,
    password: String,
    rules: Boolean
});

adminSchema.statics.finder = async function() {
    return this.find().sort('rules');
}
module.exports = mongoose.model('Admin', adminSchema);