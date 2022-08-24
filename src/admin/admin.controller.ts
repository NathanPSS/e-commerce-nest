import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CheckAdminAuthenticationGuard } from './auth-admin/guards/check-admin.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
  @UseGuards(CheckAdminAuthenticationGuard)
  @Get()
  findAll() {
    return 'Blue'
  }
 @UseGuards(CheckAdminAuthenticationGuard)
  @Patch()
  update(@Req() req: any, @Body() updateAdminDto: UpdateAdminDto) {
    const id = req.user.admin
    return this.adminService.update(+id, updateAdminDto);
  }
  @UseGuards(CheckAdminAuthenticationGuard)
  @Delete()
  remove(@Req() req: any) {
    const id = req.user.admin
    return this.adminService.remove(+id);
  }
}
