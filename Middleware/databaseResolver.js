//moddeleware/databaseResolver.js
import { getConnectionForTenant } from "../Utils/connectionManager.js";
import { verifyJWT } from "../Utils/misc.js";

export const databaseResolver = async (req, _, next) => {
  const urlArr = req.url.split("/");
  
if (urlArr.includes("login") || urlArr.includes("add")) return next();
  
  const token = req.headers.jwt;
  const payloadData = verifyJWT(token);
  const dbConnection = await getConnectionForTenant(payloadData.tenantId);
  
  req.dbConnection = dbConnection;
  next();
};