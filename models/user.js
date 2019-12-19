const mongoose = require('mongoose');
// Model for Guests base
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    date: String,
    status: false
});

userSchema.statics.finder = async function() {
    return this.find().sort('first_name');
}

const User = mongoose.model('Guests', userSchema);
module.exports = User;
