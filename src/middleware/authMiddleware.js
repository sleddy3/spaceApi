import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * AUTH MIDDLEWARE
 * - checks if JWT token exists
 * - verifies token
 * - attaches user to request
 */
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Not authenticated, No token provided",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET);

        req.user = {
            id: payload.id,
            role: payload.role,
        };

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};
