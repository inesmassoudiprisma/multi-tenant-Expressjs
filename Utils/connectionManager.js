import { initAdminDbConnection, initTenantDBConnection } from "./initDBConnection.js";
import { getATenantRepo, getTenantsRepo } from "../Repositories/tenant.js";
import { getCacheConnection, getCacheValuesArr, setCacheConnection } from "./lruCacheManager.js";

let adminDbConnection;

export const connectAllDb = async () => {
    const ADMIN_DB_URI = `mongodb://localhost:27017/super_admin`;

    adminDbConnection = await initAdminDbConnection(ADMIN_DB_URI);

const allTenants = await getTenantsRepo(adminDbConnection, {}, { name: 1, dbUri: 1, _id: 1 });

    for (const tenant of allTenants) {
        const tenantConnection = await initTenantDBConnection(tenant.dbUri, tenant.name);
        setCacheConnection(tenant._id.toString(), tenantConnection);
    }
};

export const getConnectionForTenant = async (tenantId) => {
    console.log(`Récupération de la connexion depuis le cache pour ${tenantId}`);
    let connection = getCacheConnection(tenantId);

    if (!connection) {
        console.log(`Échec du cache de connexion pour ${tenantId}`);
        const tenantData = await getATenantRepo(adminDbConnection, { _id: tenantId }, { dbUri: 1, name: 1 });

        if (tenantData) {
            connection = await initTenantDBConnection(tenantData.dbUri, tenantData.name);
            if (!connection) return null;
            console.log("Cache de connexion ajouté pour ", tenantData.name);
        } else {
            console.log("Aucune donnée de connexion pour le locataire avec l'ID", tenantId);
            return null;
        }
    }
    return connection;
};

export const getAdminConnection = () => {
    console.log("Récupération de adminDbConnection");
    return adminDbConnection;
};

const gracefulShutdown = async () => {
    console.log("Fermeture de toutes les connexions de base de données...");
    const connectionArr = getCacheValuesArr();

    for (const connection of connectionArr) {
        await connection.close();
        console.log("Connexion base de données locataire fermée.");
    }

    if (adminDbConnection) {
        await adminDbConnection.close();
        console.log("Connexion base de données admin fermée.");
    }
    console.log("Toutes les connexions de base de données fermées !");
};

let isShutdownInProgress = false;

["SIGINT", "SIGTERM", "SIGQUIT", "SIGUSR2"].forEach((signal) => {
    process.on(signal, async () => {
        if (!isShutdownInProgress) {
            console.log(`Signal ${signal} reçu, arrêt gracieux...`);
            isShutdownInProgress = true;
            await gracefulShutdown();
            process.exit(0);
        }
    });
});