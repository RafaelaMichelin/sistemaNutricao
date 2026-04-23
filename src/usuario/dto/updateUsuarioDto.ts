import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './createUsuarioDto';


export class UpdateUsuarioDto extends PartialType(
  OmitType(CreateUsuarioDto, ['cpf'] as const)
) {}