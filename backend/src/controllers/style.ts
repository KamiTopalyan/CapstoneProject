import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import StyleModel from "../models/style";
import { assertIsDefined } from "../util/assertIsDefined";

export const getStyles: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        const style = await StyleModel.find({ userId: authenticatedUserId }).exec();
        res.status(200).json(style[0]);
    
    } catch (error) {
        next(error);
    }
};

interface UpdatePasswordParams {
    styleId: string,
}

interface StyleBodyUpdate {
    backgroundColor?: string,
    navbarColor?: string,
    passwordColor?: string,
}

export const updateStyle: RequestHandler<UpdatePasswordParams, unknown, StyleBodyUpdate, unknown> = async (req, res, next) => {
    const backgroundColor = req.body.backgroundColor;
    const navbarColor = req.body.navbarColor;
    const passwordColor = req.body.passwordColor;
    const authenticatedUserId = req.session.userId;
    const styleId = req.params.styleId;
 console.log(req)
    try {
        assertIsDefined(authenticatedUserId);

        if(!backgroundColor) {
            throw createHttpError(400, "Invalid background color");
        }
        if(!navbarColor) {
            throw createHttpError(400, "Invalid background color");
        }
        if(!passwordColor) {
            throw createHttpError(400, "Invalid background color");
        }

        if(/^#[0-9A-F]{6}$/i.test(backgroundColor) && /^#[0-9A-F]{6}$/i.test(navbarColor) && /^#[0-9A-F]{6}$/i.test(passwordColor)) {
            const style = await StyleModel.findById(styleId).exec();

            if (!style) {
                throw createHttpError(404, "Style not found");
            }
    
            if (!style.userId.equals(authenticatedUserId)) {
                throw createHttpError(401, "You cannot access this style");
            }
    

            style.backgroundColor = backgroundColor
            style.navbarColor = navbarColor
            style.passwordColor = passwordColor

            const updatedStyle = await style.save()
            console.log(updatedStyle)
            res.status(200).json(updatedStyle);

        }
        else {
            throw createHttpError(400, "Invalid Hex Code");
        }
    } catch (error) {
        next(error);
    }
}
