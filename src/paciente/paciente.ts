import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Usuario } from "../usuario/usuario";
import { All } from "@nestjs/common";
import { Col } from "sequelize/lib/utils";

@Table
export class Paciente extends Model<Paciente> {

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER
    })
    usuarioId!: number;

    @AllowNull(false)
    @Column({
        type: DataType.DATE
    })
    dataNascimento!: Date;

    @AllowNull(true)
    @Column({
        type: DataType.DECIMAL(3,2)
    })
    altura?: number;

    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    objetivo?: string;
    

    @BelongsTo(() => Usuario)
    usuario! : Usuario;
}
