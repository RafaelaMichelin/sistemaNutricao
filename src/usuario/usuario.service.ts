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

    //criptografando senha
    async create(createUsuarioDto: CreateUsuarioDto){
    const usuarioData = {
    ...createUsuarioDto,
    senha: await bcrypt.hash(createUsuarioDto.senha, 10),
    } as any;  // Ou InferCreationAttributes<Usuario>

    const createdUsuario = await this.usuarioModel.create(usuarioData);
    return{
        ...createdUsuario,
        senha: undefined,
    };
}
}
