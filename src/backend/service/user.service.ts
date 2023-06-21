import User, { IUserDocument } from '../model/user.model';

async function getUsers(): Promise<IUserDocument[]> {
    const users = await User.find();

    return users;
}

async function getUserFromId(id: string): Promise<IUserDocument | null> {
    const user = await User.findById(id);

    return user;
}

async function getUserByUsername(username: string): Promise<IUserDocument | null> {
    const user = await User.findOne({ username });

    return user;
}

async function getUserByCid(cid: string): Promise<IUserDocument | null> {
    const user = await User.findOne({ cid });

    return user;
}

async function createUser(username: string, cid: string, rating: string): Promise<IUserDocument | null> {
    const user = new User({
        username,
        cid,
        rating,
    });
    return user.save();
}

async function updateRatingOfUser(id: string, rating: string): Promise<IUserDocument | null> {
    const user = await User.findByIdAndUpdate(id);
    if (user) {
        user.rating = rating;
        return user.save();
    } else {
        return null;
    }
}


async function updateUser(id: string, username: string, cid: string, rating: string): Promise<IUserDocument | null> {
    const user = await User.findByIdAndUpdate(id);
    if (user) {
        user.username = username;
        user.cid = cid;
        user.rating = rating;
        return user.save();
    } else {
        return null;
    }
}


async function deleteUser(id: string): Promise<IUserDocument | null> {
    const user = User.findByIdAndDelete(id);
    if (user) {
        return user;
    } else {
        return null;
    }
}

export default {
    getUsers,
    getUserFromId, updateRatingOfUser, getUserByCid,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
};
