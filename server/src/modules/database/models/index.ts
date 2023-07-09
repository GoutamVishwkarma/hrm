import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { AclSchema } from './acl.model';
import { RoleSchema } from './role.model';

export const getMongooseFeature = () => {
    return MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Role', schema: RoleSchema },
    { name: 'Acl', schema: AclSchema }                                      
]);
};
export * from './acl.model';
export * from './user.model';
export * from './models.module';
export * from './role.model';