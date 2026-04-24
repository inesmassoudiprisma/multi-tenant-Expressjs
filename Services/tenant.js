import mongoose from "mongoose";
import { addATenantRepo } from "../Repositories/tenant.js";
import { addATenantUserRepo } from "../Repositories/tenantUser.js";  
import { addAUserRepo } from "../Repositories/user.js";              
import { initTenantDBConnection } from "../Utils/initDBConnection.js";
import { setCacheConnection } from "../Utils/lruCacheManager.js";
import { generateHash } from "../Utils/misc.js";

const addATenantService = async (dbConn, tenantData) => {
  try {
    const data = await addATenantRepo(dbConn, { ...tenantData });

    let userData;
    if (data._id) {
      userData = await addATenantUserRepo(dbConn, {
        tenantId: data._id,
        email: tenantData.email,
      });

      const tenantDbConnection = await initTenantDBConnection(data.dbUri, data.name);

      const hashedPassword = await generateHash(tenantData.password);

      await addAUserRepo(tenantDbConnection, {
        _id: userData._id,
        email: tenantData.email,
        password: hashedPassword,
      });

      setCacheConnection(data._id.toString(), tenantDbConnection);
    }

    return {
      success: true,
      statusCode: 201,
      message: `Locataire ajouté avec succès`,
      responseObject: { tenantId: data._id, userId: userData?._id },
    };
  } catch (error) {
    throw error;
  }
};

export { addATenantService };