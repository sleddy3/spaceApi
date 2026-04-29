/**
 * ADMIN AUTHORIZATION MIDDLEWARE
 * - requires authenticate middleware to run first
 * - checks if user role is admin
 */
export const authAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Not authenticated",
        });
    }

    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            message: "Forbidden: Admin access only",
        });
    }

    next();
}