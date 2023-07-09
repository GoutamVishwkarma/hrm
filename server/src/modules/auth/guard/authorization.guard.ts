// authorization.guard.ts
import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { AclService } from 'src/helpers/service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly aclService: AclService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const path  = request.path;
    const userRoles : string[] = request.user?.roles;

    const endpoints = await this.aclService.getAcls();
    const endpoint = endpoints.find((e) => e.endpoint === path);
    Logger.log(endpoint);
    Logger.log(userRoles);
    Logger.log(path)
    for(let userRole of userRoles){
      Logger.log(userRole);
      if (endpoint?.roles.includes(userRole)) {
        return true;
      }
    }
    

    return false;
  }
}
