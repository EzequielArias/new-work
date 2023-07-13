import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { rolDto } from './dto';
import { RolService } from './rol.service';
import { Admin, Public } from '../common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rol')
@Controller('rol')
export class RolController {
  constructor(private rol: RolService) {}

  @Admin()
  @HttpCode(HttpStatus.CREATED)
  @Post('add')
  addRol(@Body() dto: rolDto) {
    const result = this.rol.addRol(dto.rol);
    return result;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('getAll')
  getAllRoles() {
    return this.rol.getAllRol();
  }

  @Admin()
  @HttpCode(HttpStatus.OK)
  @Post('set-rol')
  setRolToAccount(@Body() accountId: string) {
    return this.setRolToAccount(accountId);
  }

  @Admin()
  @HttpCode(HttpStatus.OK)
  @Post('del-rol')
  deleteRol(@Body() rolId: string): String | Error {
    return this.deleteRol(rolId);
  }
}
