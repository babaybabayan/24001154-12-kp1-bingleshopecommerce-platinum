require("dotenv").config();

const AppResponseDto = require("../dtos/app_reponse.dto");
const { verifyToken } = require("../utils/VerifyToken");

// TODO: - Need Implement after user table ready
// const User = require("../config/sequelize.config").User;
// const Role = require("../config/sequelize.config").Role;

const readToken = async (req, res, next) => {
  // if the loadoUser middleware has already laoded the user then no need to reload it again
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json(
        AppResponseDto.buildWithErrorMessages("authentication require", 401)
      );
  }
  const isHaveBearer = req.headers.authorization.split(" ")[0] === "Bearer";
  const token = req.headers.authorization.split(" ")[1];

  if (req.user != null) return next();
  if (isHaveBearer) {
    try {
      const verifyUser = await verifyToken(token, process.env.JWT_SECRET_KEY);
      req.user = verifyUser;
      next();
    } catch (error) {
      return res
        .status(401)
        .json(AppResponseDto.buildWithErrorMessages(error.name, 401));
    }
  } else {
    return next();
  }
};

const getFreshUser = (required) => {
  return (req, res, next) => {
    if (req.user.user == null || req.user.email == null) {
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
  if (req.user.user != null) {
    next();
    return;
  }
  return res.json(
    AppResponseDto.buildWithErrorMessages(
      "Permission denied, you must be authenticated"
    )
  );
};

exports.mustBeAuthenticated = [readToken, getFreshUser(true)];
exports.loadUser = [readToken, getFreshUser(false)];
