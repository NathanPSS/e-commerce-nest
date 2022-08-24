import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ExceptionService {
    trowBadRequest(message?:string, error?:string) :void{
      throw new BadRequestException(error,message)
    }
    throwForbiddenException(message ?: string, error ?:string) {
      throw new ForbiddenException(error,message)
    }
    throwNotFoundException(error? :string, message? :string){
    throw new NotFoundException(error,message)
    }
    throwUnauthorizedException(error? :string, message? :string){
      throw new UnauthorizedException(error,message)
  }
}
