const Category = require("../models/Category");
const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { name, email, grade, categoryId } = req.body;
    if (!name || !email || !grade || !categoryId ) {
      console.log("not all fields...");
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }
    const user = await User.create({
      name,
      email,
      grade,
      category:categoryId,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
    });
    await Category.findByIdAndUpdate(categoryId,{
      $push: {
        members: user._id,
      },
    })
    return res.status(200).json({
      status: 201,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
