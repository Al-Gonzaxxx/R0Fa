const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
	firstname: {type: String, required: true},
	lastname: {type: String, required: true},
	email: {type: String, unique:true, required: true},
	password: {type: String, required: true},
	isVerified: {type: Boolean, default: false}
	//timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('User', userSchema);
