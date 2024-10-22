const User = require('../models/User')
const Category = require('../models/Category');
const { default: mongoose } = require('mongoose');

module.exports = async(req,res) => {
    try{
        const{uid,cid} = req.body;
        
        let deleteResponse = await User.findByIdAndDelete(uid);
        let deleteResponse2 = await Category.findByIdAndUpdate(cid,
                                                                {
                                                                    $pull:{
                                                                        members:uid
                                                                    }
                                                                },
                                                            {new:true});
        console.log("delete",deleteResponse2)
        return res.status(200).json({
            success:true,
            data:deleteResponse2
        })
    }catch(err){
        return res.json({status:false,message:err.message});
    }
}