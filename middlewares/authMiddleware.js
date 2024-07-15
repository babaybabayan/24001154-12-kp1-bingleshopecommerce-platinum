require("dotenv").config();
const jwt = require("jsonwebtoken");
const AppResponseDto = require("../utils/app_reponse.dto");

// TODO: - Need Implement after user table ready
// const User = require("../config/sequelize.config").User;
// const Role = require("../config/sequelize.config").Role;

const readToken = (req, res, next) => {
  // if the loadoUser middleware has already laoded the user then no need to reload it again
  const authHeader = req.headers.authorization;
  const isHaveBearer = req.headers.authorization.split(" ")[0] === "Bearer";
  const token = req.headers.authorization.split(" ")[1];

  console.log(req.user);
  if (req.user != null) return next();
  if (authHeader && isHaveBearer) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
      if (err) {
        return res
          .status(409)
          .json(AppResponseDto.buildWithErrorMessages(err.name));
      }
      req.user = user;
      next();
    });
  } else {
    return next();
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user === null)
    return res.json(
      AppResponseDto.buildWithErrorMessages(
        "Access denied, you re not Logged In"
      )
    );

  if (req.user.roles.some((role) => role.name === "ROLE_ADMIN")) next();
  else
    return res.json(
      AppResponseDto.buildWithErrorMessages(
        "Access denied, you re not an Author"
      )
    );
};

const getFreshUser = (required) => {
  return (req, res, next) => {
    console.log(req.decodedJwt);
    if (req.user == null || req.user.email == null) {
      if (required)
        // no jwt, and it is required
        return res.json(
          AppResponseDto.buildWithErrorMessages("Permission denied")
        );
      // no jwt, but it is not required
      else return next();
    }
    next();
    // TODO:- will implement after user model ready
    // User.findOne({
    //   where: { id: req.decodedJwt.userId },
    //   include: [Role],
    // })
    //   .then((user) => {
    //     if (!user) {
    //       // if no user is found, but
    //       // it was a valid JWT but didn't decode
    //       // to a real user in our DB. Either the user was deleted
    //       // since the client got the JWT, or
    //       // it was a JWT from some other source
    //       res.status(401).send({ error: "Unauthorized" });
    //     } else {
    //       // update req.user with fresh user from
    //       // stale token data
    //       req.user = user;
    //       // console.log('getFreshUser then \n', req.user);
    //       next();
    //     }
    //   })
    //   .catch((err) => {
    //     // console.log('getFreshUser catch \n', err);
    //     next(err);
    //   });
  };
};

exports.isAuthenticated = (req, res, next) => {
  if (req.user != null) {
    next();
    return;
  }
  return res.json(
    AppResponseDto.buildWithErrorMessages(
      "Permission denied, you must be authenticated"
    )
  );
};

exports.signToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY || "JWT_SUPER_SECRET", {
    expiresIn: process.env.JWT_EXPIRE_TIME || 30000,
  });
};

exports.mustBeAuthenticated = [readToken, getFreshUser(true)];
exports.loadUser = [readToken, getFreshUser(false)];

exports.userOwnsItOrIsAdmin = (req, res, next) => {
  if (
    req.user != null &&
    (req.user.isAdminSync() || req.userOwnable.userId === req.user.id)
  )
    next();
  else
    return res.json(
      AppResponseDto.buildWithErrorMessages(
        "This resource does not belong to you"
      )
    );
};
