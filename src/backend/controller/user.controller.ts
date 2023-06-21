import { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await userService.getUsers();

        res.json(users);
    } catch (e) {
        next(e);
    }
}

async function getUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;

        const user = await userService.getUserFromId(userId);

        if (!user) {
            return next();
        }

        res.json(user);
    } catch (e) {
        next(e);
    }
}

async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, cid, rating } = req.body;

        const userWithSameCid = await userService.getUserByCid(cid);

        if (userWithSameCid) {
            res.status(409).json({ message: 'CID already exsists' });
        }

        const user = await userService.createUser(username, cid, rating);

        res.status(201).json(user);
    } catch (e) {
        next(e);
    }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;
        const { username, cid, rating } = req.body;
        const user = await userService.updateUser(userId, username, cid, rating);

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (e) {
        next(e);
    }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;
        const user = await userService.deleteUser(userId);

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (e) {
        next(e);
    }
}

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};