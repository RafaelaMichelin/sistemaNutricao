
import { AllowNull, AutoIncrement, Column, DataType, HasOne, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Nutricionista } from "../nutricionista/nutricionista";
import { Model } from 'sequelize-typescript';
import { Paciente } from "../paciente/paciente";


export enum TipoUsuario {
  NUTRICIONISTA = 'nutricionista',
  PACIENTE = 'paciente',
}

@Table
export class Usuario extends Model<Usuario> {

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    declare nome:string;

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING
    })
    declare email:string;

    @AllowNull(false)
    @Unique(true)  //cpf deve ser único
    @Column({
     type: DataType.STRING(11)
    })
    declare cpf: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    declare senha:string;

    @AllowNull(false)
    @Column({
        type: DataType.ENUM(...Object.values(TipoUsuario)),
    })
    declare tipoDeUsuario: TipoUsuario;

   
    @HasOne(() => Nutricionista)
    declare nutricionista: Nutricionista;

    @HasOne(() => Paciente)
    declare paciente: Paciente;

}
