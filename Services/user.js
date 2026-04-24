import { getAUserRepo } from "../Repositories/user.js";

const getUserService = async (dbConn) => {
  const users = await getAUserRepo(dbConn);

  return {
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully",
    responseObject: users,
  };
};

export { getUserService };