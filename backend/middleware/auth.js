import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    // Set user ID from the token payload
    req.user = {
      _id: verified.userId || verified._id, // Use _id consistently
    };

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Token verification failed, authorization denied" });
  }
};

export default auth;
