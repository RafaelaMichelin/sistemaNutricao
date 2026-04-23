import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './usuario';
import { CreateUsuarioDto } from './dto/createUsuarioDto';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dto/updateUsuarioDto';
@Injectable()
export class UsuarioService {
    constructor(
        @InjectModel(Usuario) private usuarioModel: typeof Usuario,
    ) {}

    //criptografando senha
    async create(createUsuarioDto: CreateUsuarioDto) {
        const usuarioData = {
            ...createUsuarioDto,
            senha: await bcrypt.hash(createUsuarioDto.senha, 10),
            tipo: createUsuarioDto.tipoDeUsuario
        } as any;  // Ou InferCreationAttributes<Usuario>

        const createdUsuario = await this.usuarioModel.create(usuarioData);
        return {
            ...createdUsuario,
            senha: undefined,
        };
    }

    findByEmail(email: string) {
        console.log('Procurando por Email:', email);
    
        if(!email){
            throw new Error('Email não informado');
        }
        return this.usuarioModel.findOne({
            where: { email },
        });
    }

    findByName(nome: string){
        console.log('Procurando por Nome:', nome);
        if(!nome){
            throw new Error('Nome não informado');
        }
        return this.usuarioModel.findOne({
            where: { nome },
        });
    }

   
    //deletar a partir do ID
    delete(id: number)
    {
        if(!id){
            throw new Error('ID não informado');
        }
        return this.usuarioModel.destroy({
            where:
            {
                id
            }
        });
    }

    //UPDATE
   async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioModel.findByPk(id);

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    if (updateUsuarioDto.senha) {
        updateUsuarioDto.senha = await bcrypt.hash(updateUsuarioDto.senha, 10);
    }

    if (updateUsuarioDto.tipoDeUsuario) {
        (updateUsuarioDto as any).tipo = updateUsuarioDto.tipoDeUsuario;
    }

    await usuario.update(updateUsuarioDto);
    return {
        ...usuario.get(), 
        senha: undefined,
    };
}
}
