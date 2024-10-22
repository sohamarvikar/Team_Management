const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	grade: {
		type: String,
		required: true,
		maxLength: 20,
	},
	category:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Category"
	},
	image: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("User", userSchema);
