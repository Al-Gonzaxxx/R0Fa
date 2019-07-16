const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
	firstname: String,
	lastname: String,
	username: String,
	passwordHash: String
});

