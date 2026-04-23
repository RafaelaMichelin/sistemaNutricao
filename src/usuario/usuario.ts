
import { AllowNull, AutoIncrement, Column, DataType, HasOne, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Nutricionista } from "../nutricionista/nutricionista";
import { Model } from 'sequelize-typescript';
import { Paciente } from "../paciente/paciente";
import type { CreationOptional } from "sequelize";


export enum TipoUsuario {
  NUTRICIONISTA = 'nutricionista',
  PACIENTE = 'paciente',
}

@Table
export class Usuario extends Model<Usuario> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    nome!:string;

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING
    })
    email!:string;

    @AllowNull(false)
    @Unique(true)  //cpf deve ser único
    @Column({
     type: DataType.STRING(11)
    })
    cpf!: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    senha!:string;

    @AllowNull(false)
    @Column({
        type: DataType.ENUM(...Object.values(TipoUsuario)),
    })
    tipoDeUsuario!: TipoUsuario;

   
    @HasOne(() => Nutricionista)
    nutricionista!: Nutricionista;

    @HasOne(() => Paciente)
    paciente!: Paciente;

}
