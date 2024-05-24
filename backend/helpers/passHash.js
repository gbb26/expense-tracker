const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt with a cost factor of 10
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the generated salt
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

async function comparePasswords(userPassword, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(userPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
}
module.exports = { hashPassword, comparePasswords };
