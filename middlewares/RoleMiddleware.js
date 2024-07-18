const AppResponseDto = require("../dtos/app_reponse.dto");

exports.isAdmin = (req, res, next) => {
  if (req.user === null)
    return res.json(
      AppResponseDto.buildWithErrorMessages(
        "Access denied, you re not Logged In"
      )
    );

  if (req.user.role === "ROLE_ADMIN") next();
  else
    return res.json(
      AppResponseDto.buildWithErrorMessages(
        "Access denied, you re not an Author"
      )
    );
};
