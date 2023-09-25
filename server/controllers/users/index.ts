import { getUserByUserName } from "./GetUserByUserName";
import { authLogin } from "./AuthLogin";
import { addNewUser } from "./AddNewUser";
import { getUserByUserEmail } from "./GetUserByEmail";

export const UsersController = {
  getUserByUserName,
  getUserByUserEmail,
  authLogin,
  addNewUser,
};
