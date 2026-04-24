import { loginService } from "../services/auth.js";
import { addATenantService } from "../services/tenant.js";
import { getUserService } from "../services/user.js";
import { getAdminConnection } from "../Utils/connectionManager.js";

export const loginController = async (req, res) => {
  const adminConn = getAdminConnection();
  const serviceFnResponse = await loginService(adminConn, req.body);
  res.status(serviceFnResponse.statusCode).json({ ...serviceFnResponse });
};

export const addATenantController = async (req, res) => {
  const adminConn = getAdminConnection();
  const serviceFnResponse = await addATenantService(adminConn, req.body);
  res.status(serviceFnResponse.statusCode).json({ ...serviceFnResponse });
};

export const getUserController = async (req, res) => {
  const serviceFnResponse = await getUserService(req.dbConnection);
  res.status(serviceFnResponse.statusCode).json({ ...serviceFnResponse });
};