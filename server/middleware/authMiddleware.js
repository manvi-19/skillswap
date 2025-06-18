const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token from "Bearer <token>"
      const decoded = jwt.verify(token, 'manu'); // Verify token
      req.user = decoded; // Attach user info to the request
      next(); // Proceed to the next middleware/route
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed!' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token!' });
  }
};

module.exports = protect;
