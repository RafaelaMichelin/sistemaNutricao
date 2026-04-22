import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './usuario';
import { CreateUsuarioDto } from './dto/createUsuarioDto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsuarioService {
    constructor(
        @InjectModel(Usuario) private usuarioModel: typeof Usuario,
    ){}

    async create(createUsuarioDto: CreateUsuarioDto){
        const usuario = {
            ...createUsuarioDto,
            senha:  await bcrypt.hash(createUsuarioDto.senha, 10),
        };

        return usuario;
    }
}
