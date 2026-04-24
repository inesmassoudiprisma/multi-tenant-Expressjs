import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signJWT = (data) => {
  return jwt.sign(data, "secret aléatoire");
};

const verifyJWT = (payload) => {
  return jwt.verify(payload, "secret aléatoire");
};

const saltRounds = 10;

const generateHash = async (input) => {
  try {
    const hash = await bcrypt.hash(input, Number(saltRounds));
    return hash;
  } catch (error) {
    console.error("Erreur lors de la génération du hash :", error);
    throw error;
  }
};

const comparePassword = async (plainPassword, hash) => {
  try {
    const match = await bcrypt.compare(plainPassword, hash);
    return match;
  } catch (error) {
    console.error("Erreur lors de la comparaison du mot de passe :", error);
    throw error;
  }
};

export { signJWT, verifyJWT, generateHash, comparePassword };