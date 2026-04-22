import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeConfigService } from './sequelize.config/sequelize.config.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    SequelizeModule.forFeature([]),    //adicionar os models 
  ],

  controllers: [AppController, UsuarioController],
  providers: [AppService, SequelizeConfigService, UsuarioService],
})
export class AppModule {}
