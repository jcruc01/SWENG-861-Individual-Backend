const bcrypt = require("bcrypt");
const { User } = require("../models/userModels");

const authenticateLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the password matches (assuming passwords are hashed)
    const isMatch = await bcrypt.compare(password, user.password); // Use bcrypt to compare hashed passwords

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    req.session.user = { id: user._id, username: user.username };

    // If the username and password are correct, return user data (exclude password)
    return res.status(200).json({
      name: user.name,
      username: user.username,
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  authenticateLogin,
};
