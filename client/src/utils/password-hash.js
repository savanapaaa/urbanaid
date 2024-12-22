import bcrypt from 'bcryptjs';

export function hashPassword(password, saltRounds = 10) {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Password hashing error:', error);
    throw error;
  }
}

export function verifyPassword(password, hashedPassword) {
  try {
    return bcrypt.compareSync(password, hashedPassword);
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

function examplePasswordUsage() {
  const password = 'mySecurePassword123!';
  const hashedPassword = hashPassword(password);
  console.log('Hashed Password:', hashedPassword);
  const isCorrectPassword = verifyPassword(password, hashedPassword);
  console.log('Correct Password Verification:', isCorrectPassword);
  const wrongPassword = verifyPassword('wrongPassword', hashedPassword);
  console.log('Wrong Password Verification:', wrongPassword);
}

export default {
  hashPassword,
  verifyPassword
};
