import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashDataService {
    public async hashData(data :string | Buffer,salt :string | number) :Promise<string>{
        const hashedData : Promise<string>=  bcrypt.hash(data,salt)
        return hashedData
    }
}
