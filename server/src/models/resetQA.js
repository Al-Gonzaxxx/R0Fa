const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const resetQASchema = new Schema({
	userId: {type: String, required: true},
	question1: {type: String, required: true},
	question2: {type: String, required: true},
	question3: {type: String, required: true},
	answer1: {type: String, required: true},
	answer2: {type: String, required: true},
	answer3: {type: String, required: true}
});

module.exports = mongoose.model('ResetQA', resetQASchema);
