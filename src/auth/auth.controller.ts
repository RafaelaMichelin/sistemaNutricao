import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/loginDto';

@ApiTags('Auth Login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // <- GARANTA QUE ISSO EXISTE
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Realizar login de usuário cadastrado',
  })
  @ApiOkResponse({
    description: 'Login realizado com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Email ou senha inválidos',
  })
  @ApiBody({
    type: LoginDto,
    examples: {
      exemplo1: {
        summary: 'Login padrão',
        value: {
          email: 'rafaela@email.com',
          senha: 'Nutri@2026',
        },
      },
    },
  })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.senha);
  }
}