const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	members: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
});

module.exports = mongoose.model("Category", categorySchema);