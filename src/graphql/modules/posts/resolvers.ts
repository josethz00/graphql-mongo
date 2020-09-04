import Post from '../../../entities/User';
import mongoose from 'mongoose';
import { IUser } from '../users/resolvers';

interface IPost{
    _id: mongoose.Types.ObjectId;
    title: string;
    content: string;
    author: IUser;
}

interface IPostInput {
    data: {
        firstName: string; 
        lastName: string; 
        author: mongoose.Types.ObjectId;
    };
}


export default {
    Query:{
        posts: () => Post.find(),
        post: async(_: any, { _id }: IPost) => Post.findById(_id)
    },
    Mutation: {
        createUser: (_: any, { data }: IPostInput) => Post.create(data),
        updateUser: (_: any, { _id }: IPost, { data }: IPostInput) => Post.findOneAndUpdate(_id, data, { new: true }),
        deleteUser: async(_: any, { _id }: IPost) => {
            const deleted = await Post.findOneAndDelete(_id);
            return !!deleted;
        }
    }
}