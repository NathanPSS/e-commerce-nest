import { Injectable } from '@nestjs/common';



@Injectable()
export class CacheNormalizeService {
    cacheStringToObject(value :string) :Array<object>{
       const arrayString = value.split(';')
       let arrayObj :Array<object> = []
       arrayString.forEach((element) =>{
         if(element !== ''){
            const objs :object = JSON.parse(element)
            arrayObj.push(objs) 
         }
       })
       return arrayObj
    }
}
