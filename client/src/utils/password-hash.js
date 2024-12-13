import bcrypt from 'bcryptjs';

/**
 * Hash a password using bcryptjs
 * @param {string} password - Plain text password
 * @param {number} saltRounds - Number of salt rounds (default 10)
 * @returns {string} Hashed password
 */
export function hashPassword(password, saltRounds = 10) {
    try {
        // Generate salt and hash synchronously
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Password hashing error:', error);
        throw error;
    }
}

/**
 * Verify a password against a stored hash
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Stored hashed password
 * @returns {boolean} Password verification result
 */
export function verifyPassword(password, hashedPassword) {
    try {
        return bcrypt.compareSync(password, hashedPassword);
    } catch (error) {
        console.error('Password verification error:', error);
        return false;
    }
}

// Example usage
function examplePasswordUsage() {
    const password = 'mySecurePassword123!';
    
    // Hash password
    const hashedPassword = hashPassword(password);
    console.log('Hashed Password:', hashedPassword);
    
    // Verify correct password
    const isCorrectPassword = verifyPassword(password, hashedPassword);
    console.log('Correct Password Verification:', isCorrectPassword);
    
    // Verify incorrect password
    const wrongPassword = verifyPassword('wrongPassword', hashedPassword);
    console.log('Wrong Password Verification:', wrongPassword);
}

export default {
    hashPassword,
    verifyPassword
};