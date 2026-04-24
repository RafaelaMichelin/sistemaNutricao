import { IsDateString, IsEmail, IsEnum, IsNumber, IsString, Matches, MaxLength, MinLength, ValidateIf } from "class-validator";
import { TipoUsuario, Usuario } from "../usuario";
import { StatusDisponibilidade } from "../../nutricionista/nutricionista";

//Dto: Validações de entrada de dados
export class CreateUsuarioDto{

@IsEmail()
email!:string;

//Validação de senha: mínimo 4 caracteres e máximo 20
@IsString()
@MinLength(4)
@MaxLength(20)
//Usando regex para definir que senha deve ter letra Maiúscula, minúscula e número
@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha fraca',
  })
  senha!: string;

  @IsString()
  nome!: string;

  @IsString()

  //Regex Validação de entrada de CPF
  @Matches(/^\d{11}$/, { message: 'CPF INVÁLIDO' })
  cpf!: string;

  @IsEnum(TipoUsuario)
  tipoDeUsuario!: TipoUsuario;
  //Aplicando validação de tipos de usuários 
  //PACIENTE
  @ValidateIf(o => o.tipoDeUsuario === TipoUsuario.PACIENTE)
  @IsNumber({}, { message: 'Altura deve ser decimal' })
  altura?:number;

  @ValidateIf(o=>o.tipoDeUsuario === TipoUsuario.PACIENTE)
  @IsDateString({}, {message: 'Data de nascimento inválida' })
  dataNascimento!: string;

   @ValidateIf(o => o.tipoDeUsuario === TipoUsuario.PACIENTE)
   @IsString({})
   objetivo!:string;

   //NUTRICIONISTA
   @ValidateIf(o => o.tipoDeUsuario === TipoUsuario.NUTRICIONISTA)
   @IsString({ message: 'CRN é obrigatória'})
   crn!: string;

   @ValidateIf(o => o.tipoDeUsuario === TipoUsuario.NUTRICIONISTA)
   @IsString()
   especialidade?: string;

   @ValidateIf(o => o.tipoDeUsuario === TipoUsuario.NUTRICIONISTA)
   @IsEnum(StatusDisponibilidade, { message: 'Disponibilidade inválida' })
   disponibilidade!: StatusDisponibilidade;
}
