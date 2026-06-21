import { BadRequestException, Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/createUsuarioDto';
import { UsuarioService } from './usuario.service';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuário')
@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService,) { }

    @Post('create')
    @ApiOperation({
        summary: 'Cadastrar um usuário',
        description: 'Cria um usuário no sistema (pode ser nutricionista ou paciente) e valida os campos obrigatórios.'
    })
    @ApiCreatedResponse({ description: 'Usuário criado com sucesso!' })
    @ApiBadRequestResponse({ description: 'Dados de requisição inválidos (ex: CPF ou Email duplicados/incorretos).' })

    @ApiBody({
    type: CreateUsuarioDto,
    description: 'Exemplo de payload para cadastrar um usuário do tipo Paciente',
    examples: {
      exemploPaciente: {
        summary: 'Exemplo: Cadastrar Paciente',
        description: 'Preencha os campos gerais e os específicos de paciente.',
        value: {
          nome: "Rafaela",
          email: "rafaela@email.com",
          cpf: "12345678901",
          senha: "Nutri@2026",
          tipoDeUsuario: "paciente",
          altura: 1.75,
          dataNascimento: "1998-05-20",
          objetivo: "Melhorar a alimentação e rendimento nos treinos",
          crn: "CRN-3/12345",         // Enviados para não travar o Swagger UI,
          especialidade: "Esportiva", // embora o @ValidateIf ignore no backend
          disponibilidade: "ativo"    // se o tipo for paciente
        }
      },
      exemploNutricionista: {
        summary: 'Exemplo: Cadastrar Nutricionista',
        description: 'Preencha os campos gerais e os específicos de nutricionista.',
        value: {
          nome: "Renan Bernardes",
          email: "Renan.nutri@email.com",
          cpf: "55544433322",
          senha: "Nutri@2026",
          tipoDeUsuario: "nutricionista",
          altura: 1.70,
          dataNascimento: "1995-03-10",
          objetivo: "Atendimento clínico",
          crn: "CRN-3/99999",
          especialidade: "Nutrição Funcional",
          disponibilidade: "ativo"
        }
      }
    }
  })
    create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuarioService.create(createUsuarioDto);
    }

    @Get('find_by_email')
    @ApiOperation({
        summary: 'Buscar um usuário pelo email'})
    @ApiQuery({ name: 'email', description: 'E-mail cadastrado do usuário', example: 'rafaela@email.com' })
    @ApiOkResponse({description: 'Usuario encontrado!'})
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    findByEmail(@Query('email') email: string) {
        return this.usuarioService.findByEmail(email);
    }

    @Get('find_by_name')
    @ApiOperation({
        summary: 'Buscar um usuário pelo nome'})
    @ApiQuery({ name: 'nome', description: 'Nome cadastrado de um usuário', example: 'Rafaela' })
    @ApiOkResponse({description: 'Usuario encontrado!'})
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    findByName(@Query('nome') nome: string) {
        if (!nome) {
            throw new BadRequestException('Nome é obrigatório');
        }
        return this.usuarioService.findByName(nome);
    }

    @Delete('delete_user')
    @ApiOperation({ summary: 'Remover um usuário pelo ID' })
    @ApiQuery({ name: 'id', description: 'ID numérico do usuário', example: 1 })
    @ApiOkResponse({ description: 'Usuário deletado com sucesso.' })
    delete(@Query('id') id: number) {
        return this.usuarioService.delete(id);
    }

}
