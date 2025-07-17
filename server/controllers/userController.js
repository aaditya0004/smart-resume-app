import User from "../models/userModel.js";
import Resume from "../models/resumeModel.js";

/**
 * @desc    Get user profile and resume history
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select('-password');

    if (user) {

      const resumeHistory = await Resume.find({ user: user._id }).sort({ createdAt: -1 });

      // Return all the data the frontend needs for the profile page
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        history: resumeHistory,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error while fetching profile." });
  }
};