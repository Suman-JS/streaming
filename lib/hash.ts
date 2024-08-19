import * as bcrypt from "bcrypt";

export async function generateHash(password: string) {
  let hashedPassword: string | null;
  let salt: string | null;
  try {
    salt = await bcrypt.genSalt(16);
    hashedPassword = await bcrypt.hash(password, salt);

    return {
      salt,
      hashedPassword,
    };
  } catch (error) {
    console.error("[Password Hash]", error);
    return {
      hashedPassword: null,
      salt: null,
    };
  }
}

export async function compareHash(password: string, hashedPassword: string) {
  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    console.error("[Check password]:", error);
    return false;
  }
}
