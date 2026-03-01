export const isAdmin = (req, res, next) => {
    // Check if the user exists and has the admin role
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Forbidden: Admin access only" });
    }
};