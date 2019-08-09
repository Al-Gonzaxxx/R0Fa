const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');



const commentSchema = new Schema({
	_postId: 	{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post'},
	text: 		{type: String, required: true},
	//timestamps: { createdAt: 'created_at' , updatedAt: 'updated_at' }
	//	customerID: {type: String },
});
commentSchema.plugin(timestamps);

module.exports = mongoose.model('Comment', commentSchema);
