import jwt from "jsonwebtoken";
import  {User} from "../models/User.js";
import mongoose from "mongoose";

const registerUser = async (req, res) => {
  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existing = await User.findOne({
      email: email.toLowerCase()
    });

    if (existing) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password
    });

    // ✅ CREATE TOKEN
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });

  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "User logged in",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


const logoutUser = async(req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({
            email
        });

        if(!user) return res.status(404).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "Logout Successful"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        })
    }
}

export const getAuthorProfile = async (req, res) => {
  console.log("getAuthorProfile called with id:", req.params.id);

  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    console.log("PROFILE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


export const toggleFollow = async (req, res) => {
  try {
    const { id: targetUserId } = req.params; 
    const currentUserId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    if (targetUserId === currentUserId.toString()) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser) return res.status(404).json({ message: "User not found" });

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      // Unfollow
      currentUser.following.pull(targetUserId);
      targetUser.followers.pull(currentUserId);
    } else {
      // Follow
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({ following: !isFollowing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get followers of a user
export const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("followers", "username");
    if (!user) return res.status(404).json({ message: "User not found" });

    const followerIds = user.followers.map(f => f._id.toString());
    res.json(followerIds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export{
    registerUser,
    loginUser,
    logoutUser
}