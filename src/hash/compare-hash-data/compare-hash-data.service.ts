import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class CompareHashDataService {
    public async compareHash(data : string | Buffer,hash : string) :Promise<boolean>{
        return bcrypt.compare(data,hash)
    }
}
