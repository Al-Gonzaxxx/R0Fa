const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tokenSchema = new Schema({
	_userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
	token: {type: String, required: true},
	createAt: {type: Date, required: true, default: Date.now, expires: 3600},
	uri: {type: String, required: true}
	//timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('Token', tokenSchema);
