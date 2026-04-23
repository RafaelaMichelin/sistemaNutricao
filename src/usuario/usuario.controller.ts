import { BadRequestException, Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/createUsuarioDto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {

 constructor(private usuarioService: UsuarioService, ){}

     @Post('create')
    create(@Body() createUsuarioDto: CreateUsuarioDto)
    {
        return this.usuarioService.create(createUsuarioDto);
    }

    @Get('find_by_email')
    findByEmail(@Query('email') email: string)
    {
        return this.usuarioService.findByEmail(email);
    }

    @Get('find_by_name')
    findByName(@Query('nome') nome: string)
    {
        if(!nome){
             throw new BadRequestException('Nome é obrigatório');
        }
        return this.usuarioService.findByName(nome);
    }

    @Delete('delete_user')
    delete(@Query('id') id: number)
    {
        return this.usuarioService.delete(id);
    }

}
