const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = async (userID, email) => {
    // Define the payload for the JWT
    const payload = { userID, email };

    // Generate and sign the JWT
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' }); // Adjust the expiry time as needed

    return token;
}

const authToken = async (req, res, next) => {
    // Get the Authorization header
    const authHeader = req.headers['authorization'];

    // Check if Authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Attach the decoded user information to the request object for further use
        req.body = {
            ...req.body,
            userID: decoded.userID,
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = { generateToken, authToken };
