const addAUserRepo = async (dbConn, userData, session = null) => {
  const sessionOption = session ? { session } : {};
  const data = await dbConn.model("users").create([userData], sessionOption);
  return data[0];
};

const getAUserRepo = async (dbConn, findQuery = {}) => {
  const data = await dbConn.model("users").findOne(findQuery).lean();
  return data;
};

export { addAUserRepo, getAUserRepo };
