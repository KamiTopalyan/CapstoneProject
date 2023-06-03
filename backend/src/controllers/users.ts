import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import StyleModel from "../models/style";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
    userKey?: string,
    userIV?: string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    const key: string = crypto.randomBytes(32).toString("hex")
    const iv: string = crypto.randomBytes(16).toString("hex")

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const existingUsername = await UserModel.findOne({ username: username }).exec();

        if (existingUsername) {
            throw createHttpError(409, "Username already taken. Please choose a different one or log in instead.");
        }

        const existingEmail = await UserModel.findOne({ email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "A user with this email address already exists. Please log in instead.");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
            userKey: key, 
            userIV: iv,
        });
        
        StyleModel.create({
            userId: newUser["_id"]
        })

        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await UserModel.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
};

interface StyleBody {
    username?: string,
    password?: string,
    color?: string,
}

export const getStyle: RequestHandler<unknown, unknown, StyleBody, unknown> = async (req, res, next) => {
    const color = req.body.color;
    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({ username: username }).select("+password +email").exec();


}

interface StyleBodyUpdate {
    username?: string,
    password?: string,
    oldColor?: string,
    newColor: string,
}

export const updateStyle: RequestHandler<unknown, unknown, StyleBodyUpdate, unknown> = async (req, res, next) => {
    const newColor = req.body.newColor;
    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({ username: username }).select("+password +email").exec();
    if(/^#[0-9A-F]{6}$/i.test(newColor)) {
        user?.updateOne({}, {backgroundColor: newColor})
    }
    else {
        throw createHttpError(400, "Invalid Hex Code");
    }
}