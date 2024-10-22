const Category = require('../models/Category')

module.exports = async (req, res) => {

    try{
        let allCategories = await Category.find({}).populate({path:'members',populate:'category'});

        res.status(200).json({status:true,data: allCategories})
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }

}