const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');


const postSchema = new Schema({
	text: {type: String},
	likes: {type: Number, default: 0},
	dislikes: {type: Number, default: 0},
	pictures: {type: String},
	//timestamps: { createdAt: 'created_at' , updatedAt: 'updated_at' }
});
postSchema.plugin(timestamps);

module.exports = mongoose.model('Post', postSchema);
