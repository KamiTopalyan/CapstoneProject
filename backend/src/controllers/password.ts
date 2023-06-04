import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import PasswordModel from "../models/password";
import UserModel from "../models/user";
import { assertIsDefined } from "../util/assertIsDefined";
import encryptPassword from "../util/encryptPassword"
import decryptPassword from "../util/decryptPassword"

export const getPasswords: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        const passwords = await PasswordModel.find({ userId: authenticatedUserId }).exec();
        const user = await UserModel.findById(authenticatedUserId).exec();
        const key: string = user?.userKey || "";
        const iv: string = user?.userIV || "";

        const decryptedPasswords = passwords.map(function (curObj, index: number) {
            return {
                _id: curObj._id,
                userId: curObj.userId,
                password: decryptPassword(passwords[index]["password"], key, iv),
                website: curObj.website,
                username: curObj.username,
                createdAt: curObj.createdAt,
                updatedAt: curObj.updatedAt,
                __v: curObj.__v
            }
        })
        res.status(200).json(decryptedPasswords);
    } catch (error) {
        next(error);
    }
};

export const getPassword: RequestHandler = async (req, res, next) => {
    const passwordId = req.params.passwordId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(passwordId)) {
            throw createHttpError(400, "Invalid password id");
        }

        const password = await PasswordModel.findById(passwordId).exec();


        if (!password) {
            throw createHttpError(404, "password not found");
        }

        if (!password.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this password");
        }

        res.status(200).json(password);
        
    } catch (error) {
        next(error);
    }
};

interface CreatePasswordBody {
    password?: string,
    website?: string,
    username?: string
}

export const createPassword: RequestHandler<unknown, unknown, CreatePasswordBody, unknown> = async (req, res, next) => {
    const password = req.body.password;
    const website = req.body.website;
    const username = req.body.username;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!password) {
            throw createHttpError(400, "password must have a password");
        }

        const user = await UserModel.findById(authenticatedUserId).exec();
        const key: string = user?.userKey || "";
        const iv: string = user?.userIV || "";

        const newpassword = await PasswordModel.create({
            userId: authenticatedUserId,
            password: encryptPassword(password, key, iv),
            website: website,
            username: username,
        });

        res.status(201).json(newpassword);
    } catch (error) {
        next(error);
    }
};

interface UpdatePasswordParams {
    passwordId: string,
}

interface UpdatePasswordBody {
    password?: string,
    website?: string,
    username?: string
}

export const updatePassword: RequestHandler<UpdatePasswordParams, unknown, UpdatePasswordBody, unknown> = async (req, res, next) => {
    const passwordId = req.params.passwordId;
    const newPassword = req.body.password;
    const newWebsite = req.body.website;
    const newUsername = req.body.username;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(passwordId)) {
            throw createHttpError(400, "Invalid password id");
        }

        if (!newPassword) {
            throw createHttpError(400, "Password must have a password");
        }

        if (!newWebsite) {
            throw createHttpError(400, "Password must have a website");
        }

        if (!newUsername) {
            throw createHttpError(400, "Password must have a username");
        }

        const password = await PasswordModel.findById(passwordId).exec();

        if (!password) {
            throw createHttpError(404, "Password not found");
        }

        if (!password.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this password");
        }

        const user = await UserModel.findById(authenticatedUserId).exec();
        const key: string = user?.userKey || "";
        const iv: string = user?.userIV || "";

        password.password = encryptPassword(newPassword, key, iv);
        password.website = newWebsite;
        password.username = newUsername;

        const updatedPassword = await password.save();

        res.status(200).json(updatedPassword);
    } catch (error) {
        next(error);
    }
};

export const deletePassword: RequestHandler = async (req, res, next) => {
    const passwordId = req.params.passwordId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(passwordId)) {
            throw createHttpError(400, "Invalid password id");
        }

        const password = await PasswordModel.findById(passwordId).exec();

        if (!password) {
            throw createHttpError(404, "Password not found");
        }

        if (!password.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this password");
        }

        await password.remove();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};