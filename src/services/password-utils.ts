import bcryptjs from 'bcryptjs';

export const hashPassword = async (pass: string, salt: string | number): Promise<string> => {
  const hashedPassword = await bcryptjs.hash(pass, salt);

  return hashedPassword;
};

export const validatePassword = async (reqPass: string, passFromDatabase: string): Promise<boolean> => {
  const comparedPass = await bcryptjs.compare(reqPass, passFromDatabase);

  return comparedPass;
};
