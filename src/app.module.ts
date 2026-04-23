import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeConfigService } from './sequelize.config/sequelize.config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { Usuario } from './usuario/usuario';
import { Nutricionista } from './nutricionista/nutricionista';
import { Paciente } from './paciente/paciente';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    JwtModule.registerAsync({
    imports: [ConfigModule],       
    inject: [ConfigService],
      useFactory: (config: ConfigService) =>({
        secret: config.get('JWT_SECRET'),
        signOptions: {expiresIn: config.get('JWT_EXPIRES') },
      }),
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    SequelizeModule.forFeature([Usuario, Paciente, Nutricionista]),  //adicionar os models 
  ],

  controllers: [AppController, UsuarioController, AuthController],
  providers: [AppService, SequelizeConfigService, UsuarioService, AuthService],
})
export class AppModule {}
