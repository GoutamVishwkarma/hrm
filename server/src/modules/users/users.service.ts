import {Injectable, Logger} from '@nestjs/common';
import {User} from 'src/modules/database/models';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class UsersService {
	private readonly logger = new Logger(UsersService.name);
	constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

	async create(user: User): Promise<User> {
		const createdUser = new this.userModel(user);
		return createdUser.save();
	}

	async findAll(): Promise<User[]> {
		this.logger.log('findAll');
		return await this.userModel.find().exec();
	}

	async findOne(id: string): Promise<User> {
		return this.userModel.findOne({userId: id}).exec();
	}
	async findOneByEmail(email: string): Promise<User> {
		return await this.userModel.findOne({email}).populate('roles').exec();
	}

	async update(id: string, user: User): Promise<User> {
		return this.userModel.findByIdAndUpdate(id, user, {new: true}).exec();
	}

	async delete(id: string): Promise<User> {
		return this.userModel.findByIdAndRemove(id).exec();
	}
}
