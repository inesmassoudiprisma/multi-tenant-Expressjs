import { getATenantUserRepo } from "../Repositories/tenantUser.js";
import { getAUserRepo } from "../Repositories/user.js";
import { getConnectionForTenant } from "../Utils/connectionManager.js";
import { comparePassword, signJWT } from "../Utils/misc.js";

const loginService = async (adminConn, userData) => {
  const { email, password } = userData;

  const tenantUser = await getATenantUserRepo(adminConn, { email });
  if (!tenantUser) {
    return {
      success: false,
      statusCode: 401,
      message: "Email ou mot de passe incorrect",
    };
  }

  const tenantConn = await getConnectionForTenant(tenantUser.tenantId.toString());

  const user = await getAUserRepo(tenantConn, { email });
  if (!user) {
    return {
      success: false,
      statusCode: 401,
      message: "Email ou mot de passe incorrect",
    };
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return {
      success: false,
      statusCode: 401,
      message: "Email ou mot de passe incorrect",
    };
  }

  const accessToken = signJWT({
    userId: user._id.toString(),
    tenantId: tenantUser.tenantId.toString(),
  });

  return {
    success: true,
    statusCode: 200,
    message: "Connecté avec succès",
    responseObject: {
      accessToken,
      userId: user._id.toString(),
      tenantId: tenantUser.tenantId.toString(),
    },
  };
};

export { loginService };