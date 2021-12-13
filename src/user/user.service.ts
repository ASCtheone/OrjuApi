import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  users: User[] = [];

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  getUser(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  addUser(newUser: Partial<User>) {
    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }

  updateUser(username: string, updUser: Partial<User>): Promise<User> {
    return this.userModel.findOneAndUpdate({ username }, updUser).exec();
  }

  deleteUser(username: string): Promise<any> {
    return this.userModel.findOneAndDelete({ username }).exec();
  }
}
