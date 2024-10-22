const Category = require('../models/Category')

module.exports = async (req, res) => {

    try{
        console.log("first")
        const{name} = req.body;
        console.log(name)
        await Category.create({name});
        return res.status(200).json({
            success:true,
            message:"category created succesfully !!!"
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }

}