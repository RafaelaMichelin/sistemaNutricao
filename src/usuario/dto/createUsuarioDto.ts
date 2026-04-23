import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { TipoUsuario, Usuario } from "../usuario";

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

}
