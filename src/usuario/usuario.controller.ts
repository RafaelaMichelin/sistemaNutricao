import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/createUsuarioDto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {

 constructor(private usuarioService: UsuarioService, ){}

     @Post()
    create(@Body() createUsuarioDto: CreateUsuarioDto)
    {
        return this.usuarioService.create(createUsuarioDto);
    }
}
