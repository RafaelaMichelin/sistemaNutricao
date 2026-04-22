import { Model } from "sequelize-typescript";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Table, Unique } from "sequelize-typescript";
import { Usuario } from "../usuario/usuario";


//Declarando ENUM
export enum StatusDisponibilidade {
    ATIVO = 'ativo',
    INATIVO = 'inativo'
}

@Table
export class Nutricionista extends Model<Nutricionista> {

    @ForeignKey(() => Usuario)
    @Column({
        type:DataType.INTEGER
    })
    usuarioId!: number;


    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    crn!: string;

    @AllowNull(true)
    @Column({
        type: DataType.STRING
    })
    especialidade?: string;

    @AllowNull(false)
    @Column({
        type: DataType.ENUM(...Object.values(StatusDisponibilidade))
    })
    disponibilidade!: StatusDisponibilidade;

     


    @BelongsTo(() => Usuario)
    usuario!: Usuario;
}
