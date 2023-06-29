import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from './user.model';

export const getMongooseFeature = () => {
    return MongooseModule.forFeature([{ name: 'User', schema: UserModel }]);
};
export * from './user.model';