
//reposotories/tenantUser.js
const addATenantUserRepo = async (dbConn, userData, session = null) => {
  const sessionOption = session ? { session } : {};
  const data = await dbConn.model("tenantusers").create([userData], sessionOption);
  return data[0];
};

const getATenantUserRepo = async (dbConn, findQuery = {}) => {
  const data = await dbConn.model("tenantusers").findOne(findQuery).lean();
  return data;
}

export { addATenantUserRepo, getATenantUserRepo };