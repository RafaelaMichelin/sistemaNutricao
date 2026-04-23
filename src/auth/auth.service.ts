import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from '../usuario/usuario';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from '../usuario/dto/createUsuarioDto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Usuario) private usuarioModel: typeof Usuario,
        private usuarioService: UsuarioService,
        private jwtService: JwtService,) {}


        //Validação de Usuário para fazer o Login
    async validateUser(email: string, senha: string) {
        const usuario = await this.usuarioService.findByEmail(email);
        console.log('📥 EMAIL:', email);
        if (!usuario) {
            throw new UnauthorizedException('Email ou senha incorretos');
        }

        const isPasswordValid = await bcrypt.compare(senha, usuario.senha);

        if (isPasswordValid) {
            const { senha, ...result } = usuario.get({ plain: true });
            return result;
        }
    throw new UnauthorizedException('Email ou senha incorretos');
    }

    async login(email: string, senha: string) {
        const usuario = await this.validateUser(email, senha);
        //campos para compor o TOKEN
        const payload = { usuario_id: usuario?.id, email: usuario?.email };

        return {
            acess_token: await this.jwtService.sign(payload)
        };
    }


}
