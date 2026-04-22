import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './usuario';
import { CreateUsuarioDto } from './dto/createUsuarioDto';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectModel(Usuario) private usuarioModel: typeof Usuario,
    ){}

    create(createUsuarioDto: CreateUsuarioDto){
        return 'Thist action adds a new User';
    }
}
