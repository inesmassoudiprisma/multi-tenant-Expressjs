import mongoose from "mongoose";
import TenantSchema from "../Schema/tenant.js";
import TenantUserSchema from "../Schema/tenantUser.js";
import UserSchema from "../Schema/users.js"; 

const clientOption = {
  socketTimeoutMS: 30000,
};

mongoose.set("debug", true);

const initAdminDbConnection = async (DB_URL) => {
  try {
    const db = mongoose.createConnection(DB_URL, clientOption);
    
    db.on("error", (err) => console.log("Erreur db admin : ", err));
    db.once("open", () => console.log("Connexion MongoDB client Admin OK !"));
    
    await db.model("tenants", TenantSchema);
    await db.model("tenantusers", TenantUserSchema);
    
    return db;
  } catch (error) {
    return error;
  }
};

const initTenantDBConnection = async (DB_URL, dbName) => {
  try {
    const db = mongoose.createConnection(DB_URL, clientOption);
    
    db.on("error", (err) => console.log(`Erreur db locataire ${dbName} : `, err));
    db.once("open", () => console.log(`Connexion locataire pour ${dbName} MongoDB OK !`));
    
    await db.model("users", UserSchema);
    
    return db;
  } catch (error) {
    return error;
  }
};

export { initAdminDbConnection, initTenantDBConnection };