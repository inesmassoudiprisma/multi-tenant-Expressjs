import { LRUCache } from "lru-cache";

const cacheOptions = {
  max: 5000,
  maxAge: 1000 * 60 * 60,
};

const connectionCache = new LRUCache(cacheOptions);

const setCacheConnection = (tenantId, dbConn) => {
  console.log("Configuration du cache de connexion pour ", tenantId);
  connectionCache.set(tenantId, dbConn);
};

const getCacheConnection = (tenantId) => {
  return connectionCache.get(tenantId);
};

const getCacheValuesArr = () => {
  return connectionCache.values();
};

export { setCacheConnection, getCacheConnection, getCacheValuesArr };