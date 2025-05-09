import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
  //sign takes in a payload (an object, not variable), secret and expiry time
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  //sets a Set-Cookie header in the HTTP response for the browser to store
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //in ms, can store for 7 days
    httpOnly: true, //prevents XSS attacks by not allowing JS to access cookie
    sameSite: "strict", //prevents cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "dev", //only send cookie over HTTPS in production
  });
  return token;
};
