import { user } from "../models/user.model.js";
import bycrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { createTokenAndSaveCookies } from "../jwt/AuthToken.js";
// import { blog } from "../models/blog.model.js";

export let register = async (req, res) => {
  try {
    // if (!req.files || Object.keys(req.files).length == 0) {
    //   return res.status(400).json({ message: "No File uploaded" });
    // }
    const photo = req?.files?.photo;

    if (photo) {
      const allowed_formats = ["image/jpeg", "image/png"];
      if (!allowed_formats.includes(photo.mimetype)) {
        return res.status(400).json({ message: "Invalid Photo Format" });
      }
    }

    const { name, phone, email, gender, password, cpassword } = req.body;
    console.log(name, typeof phone, email, gender, password, cpassword);

    if (!name || !phone || !email || !password || !cpassword) {
      return res.status(500).json({ message: "Fill All Fields" });
    }

    let find_user = await user.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (find_user) {
      return res
        .status(409)
        .json({ message: "User already exists with this email or phone" });
    }

    if (password != cpassword) {
      return res.status(400).json({ message: "Password Not Match" });
    }

    let cloudinaryResponse;
    if (photo) {
      cloudinaryResponse = await cloudinary.uploader.upload(
        photo.tempFilePath,
        {
          folder: "Blog_web/user_data/new_data",
        }
      );

      if (!cloudinaryResponse || cloudinaryResponse.error) {
        return res
          .status(500)
          .json({ message: "Cloud Error.Try Again Letter" });
      }
    }
    const avatar_url = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }?username=${name}`;

    {
      const hashed_pass = await bycrypt.hash(password, 10);

      const create_user = new user({
        // name: name,
        // phone: phone,
        // role: role,
        // email: email,
        name,
        phone,
        gender,
        email,
        password: hashed_pass,
        image: {
          public_id: cloudinaryResponse ? cloudinaryResponse.public_id : "none",
          url: cloudinaryResponse ? cloudinaryResponse?.secure_url : avatar_url,
        },
      });
      await create_user.save();
      const token = await createTokenAndSaveCookies(create_user._id, res);
      res.status(200).json({
        message: "User created Successfully",
        create_user,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export let login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const find_user = await user.findOne({ email });
    // const isMatch=await bycrypt.compare(password,find_user.password); // canot use bacause if user not fould then how it compare directly.
    let isMatch;

    console.log(email, password, isMatch);
    console.log(typeof email, typeof password, typeof isMatch);
    if (find_user) {
      isMatch = await bycrypt.compare(password, find_user.password);

      console.log("first");
      // if (find_user.role !== role) {
      //   return res.status(400).json({ message: `Invalid role ${role}` });
      // }
    }
    // res.status(200).json({find_user});
    // res.status(200).json({isMatch});

    if (!find_user || !isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = await createTokenAndSaveCookies(find_user._id, res);
    res
      .status(200)
      .json({ message: "You Loged In Successfully", find_user, token: token });
  } catch (error) {
    console.log("Error:-", error.message);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  res.status(200).json({ message: "User logged out successfully" });
};

export const getMyProfile = async (req, res) => {
  const user_data = await req.users;
  res.status(200).json({ user_data });
};

export const getAllAdmin = async (req, res) => {
  const all_admin = await user.find();

  if (!all_admin || all_admin.length == 0) {
    return res.status(400).json({ message: "No User found" });
  }
  res.status(200).json(all_admin);
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_data = { ...req.body };

    console.log(updated_data);
    const old_data = await user.findById(id);
    // console.log(updated_data)

    if (!old_data) {
      return res.status(500).json({ message: "No User Found" });
    }

    const avatar_Id = updated_data?.avatar_Id;
    console.log(avatar_Id);
    let avatar_url = "";

    if (avatar_Id) {
      if (avatar_Id === "name_first" || avatar_Id === "n_first_last") {
        if (avatar_Id === "name_first") {
          avatar_url = `https://avatar.iran.liara.run/username?username=${updated_data.name}&length=1`;
        } else {
          avatar_url = `https://avatar.iran.liara.run/username?username=${updated_data.name}&length=2`;
        }
      } else if (avatar_Id === "police" || avatar_Id === "police_f") {
        avatar_url = `https://avatar.iran.liara.run/public/job/police/${old_data.gender}`;
      } else if (!isNaN(avatar_Id)) {
        avatar_url = `https://avatar.iran.liara.run/public/${updated_data.avatar_Id}`;
      } else {
        avatar_url = avatar_Id;
        console.log("Invalid");
      }
    }

    console.log(avatar_url);

    updated_data.image = {
      // public_id: cloudinary_response.public_id,
      // url: cloudinary_response.secure_url,

      public_id: "none",
      url: avatar_url,
    };
    // console.log(updated_data);

    const updated_profile = await user.findByIdAndUpdate(
      id,
      { $set: updated_data },
      { new: true, runValidation: true }
    );

    res.status(200).json({
      message: "Update Successfully",
      // updated_data,
      updated_profile,
    });
  } catch (error) {
    console.log(error);
  }

  // if (req.files && req.files.image) {
  //   const new_image = req?.files?.image;
  //   const cloudinary_response = await cloudinary.uploader.upload(
  //     new_image.tempFilePath,
  //     {
  //       folder: "Blog_web/user_data/updated_data",
  //     }
  //   );

  //   if (!cloudinary_response && cloudinary_response.error) {
  //     return res.status(500).json({ message: "Cloud Error" });
  //   }

  //   if (cloudinary_response) {
  //     updated_data.image = {
  //       public_id: cloudinary_response.public_id,
  //       url: cloudinary_response.secure_url,
  //     };
  //   }
  // } else if (req.body.image) {
  //   updated_data.image = old_data.image;
  // }
};
