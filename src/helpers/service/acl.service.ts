import { Acl } from 'src/modules/database/models';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AclService {
  private cachedAcls: Map<string, Acl[]> = new Map();

  constructor(@InjectModel('Acl') private readonly AclModel: Model<Acl>) {}

  async getAcls(): Promise<Acl[]> {
    const Acls = this.cachedAcls.get('Acls');

    if (Acls) {
      return Acls;
    }

    const fetchedAcls = await this.AclModel.find().exec();
    this.cachedAcls.set('Acls', fetchedAcls);
    Logger.log('Acls fetched from db');
    return fetchedAcls;
  }

  async clearCache() {
    this.cachedAcls.clear();
  }
}
