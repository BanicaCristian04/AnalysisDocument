exports.checkSession = (req, res) => {
    try {
      if (req.session && req.session.user) {
        res.status(200).json({ user: req.session.user });
      } else {
        res.status(200).json({ user: null, message: "No active session" });
      }
    } catch (error) {
      console.error("Error checking session:", error.message);
      res.status(500).json({ message: "An error occurred while checking the session." });
    }
  };