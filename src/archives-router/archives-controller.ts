import { Controller, Get, Res } from "@nestjs/common";
import { Response } from 'express'
import * as path from 'path'


@Controller('archieves')
export class ArchivesController {
    @Get('background-login')
    backgroundLogin(@Res() res:Response){
        return res.sendFile(path.resolve('public/117615_6.jpg'))
    }
    @Get('background-signup')
    backgroundSignup(@Res() res:Response){
        return res.sendFile(path.resolve('public/29.-Pale-Cornflower-Blue_1.jpg'))
    }
}