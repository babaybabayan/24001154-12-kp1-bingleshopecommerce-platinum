const AppResponseDto = require("../dtos/app_reponse.dto");
const { USER_ROLE } = require("../utils/Constants");

exports.isAdmin = (req, res, next) => {
  if (req.user === null)
    return res.json(
      AppResponseDto.buildWithErrorMessages(
        "Access denied, you re not Logged In"
      )
    );

  if (req.user.role === USER_ROLE.isAdmin) next();
  else
    return res.json(
      AppResponseDto.buildWithErrorMessages(
        "Access denied, you re not an Author"
      )
    );
};
