import { signupService, loginService } from "../services/authService.js";

/**
 * SIGNUP CONTROLLER
 */
export const signup = async (req, res, next) => {
    try {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: "USER" // Default to USER 
        };

        const user = await signupService(userData);

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * LOGIN CONTROLLER
 */
export const login = async (req, res, next) => {
    try {
        const credentials = {
            email: req.body.email,
            password: req.body.password
        };

        const result = await loginService(credentials);

        return res.status(200).json({
            message: "Login successful",
            token: result.token,
        });
    } catch (error) {
        next(error);
    }
};