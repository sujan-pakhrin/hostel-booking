import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("Invalid Token");
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return res.status(401).json("You are not authenticated");
        }
        req.user = user;
        next();
    });
};
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === parseInt(req.params.id) || req.user.isAdmin === 1) {
            next();
        } else {
            return res.status(403).json("You are not authorized");
        }
    });
};
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin === 1) {
            next();
        } else {
            return res.status(403).json("You are not authorized");
        }
    });
};
