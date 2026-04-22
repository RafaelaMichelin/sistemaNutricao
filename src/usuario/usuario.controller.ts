import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/createUsuarioDto';

@Controller('usuario')
export class UsuarioController {

     @Post('create_user')
    create(@Body() createUsuarioDto: CreateUsuarioDto)
    {
        return this.UsuarioService.create(createUsuarioDto);
    }
}
