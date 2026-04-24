//repositories/tenant.js
import mongoose from "mongoose";

const mainSchemaName = "tenants";

const getTenantsRepo = async (adminDbConnection, findQuery = {}, selectQuery = {}) => {
  const data = await adminDbConnection
    .model(mainSchemaName)
    .find(findQuery)
    .select(selectQuery)
    .lean();
  return data;
};

const getATenantRepo = async (adminDbConnection, findQuery = {}, selectQuery = {}) => {
  const data = await adminDbConnection
    .model(mainSchemaName)
    .findOne(findQuery)
    .select(selectQuery)
    .lean();
  return data;
};

const addATenantRepo = async (adminDbConnection, tenantData, session = null) => {
  const sessionOption = {};
  if (session) sessionOption.session = session;
  const data = await adminDbConnection
    .model(mainSchemaName)
    .create([tenantData], sessionOption);
  return data[0];
};

const updateATenant = async (adminDbConnection, findQuery = {}, updateQuery = {}) => {
  const data = await adminDbConnection
    .model(mainSchemaName)
    .updateOne(findQuery, updateQuery);
  return data;
};

export { getTenantsRepo, getATenantRepo, addATenantRepo, updateATenant };