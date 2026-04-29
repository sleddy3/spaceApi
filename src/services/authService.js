import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../repositories/userRepo.js"

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

/**
 * SIGNUP SERVICE
 * - checks if user exists
 * - hashes password
 * - creates user in DB
 * - returns safe user (no password)
 */
export const signupService = async ({ username, email, password }) => {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        const error = new Error("User already exists");
        error.status = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
        username,
        email,
        password: hashedPassword,
    });

    delete user.password;

    return user;
}

/**
 * LOGIN SERVICE
 * - verifies user exists
 * - compares password
 * - returns JWT token
 */
export const loginService = async ({ email, password }) => {
    const user = await findUserByEmail(email);

    if (!user) {
        const error = new Error("Invalid credentials");
        error.status = 401;
        throw error;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        const error = new Error("Invalid credentials");
        error.status = 401;
        throw error;
    }
    
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return { token };
}