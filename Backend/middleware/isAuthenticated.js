const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      next();  
    } else {
      res.status(401).json({ error: "You must be logged in" });
    }
  };
  
 
  module.exports = isAuthenticated;
 