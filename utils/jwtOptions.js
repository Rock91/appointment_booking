const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY || "secret";

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  let user = getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});


const createToken = (data) => jwt.sign(data, "secret", { expiresIn: 1000 });
module.exports = { jwtOptions, ExtractJwt, JwtStrategy, strategy, createToken };
