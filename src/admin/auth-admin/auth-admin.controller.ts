import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAdminAuthGuard } from './guards/local-admin.guard';


@Controller('admin')
export class AuthAdminController {
    @UseGuards(LocalAdminAuthGuard)
    @Post('/login')
    login(){}
}
