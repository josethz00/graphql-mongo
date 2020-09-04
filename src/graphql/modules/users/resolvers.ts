import User from '../../../entities/User';
import mongoose from 'mongoose';


export interface IUser {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email?: string;
    active: boolean;
}

interface IUserInput {
    data: {
        firstName: string,
        lastName: string,
        email: string,
        active: boolean,
    };
}

export default {
    Query:{
        users: () => User.find(),
        user: async(_: any, { _id }: IUser) => { 
            const user = await User.findById(_id);
            return user;
        }
    },
    Mutation: {
        createUser: (_: any, { data }: IUserInput) => User.create(data),
        updateUser: async(_: any, { _id } : IUser,  { data }) => { 
            const user = await User.findByIdAndUpdate(_id, data, { new: true });
            return user;
        },
        deleteUser: async(_: any, { _id }: IUser) => {
            const deleted = await User.findOneAndDelete(_id);
            return !!deleted;
        }
    }
}