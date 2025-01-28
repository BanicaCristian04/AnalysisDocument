const authService = require('../services/authServices');
exports.login = async (req, res) => {
  try {
    const user = await authService.login(req.body.email, req.body.password);
    
    req.session.user = { id: user._id, username: user.username };
    res.status(200).json({ user: req.session.user });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logout successful" });
  });
};
