import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //swagger
  const config = new DocumentBuilder()
                     .setTitle('Api Sistema nutrição')
                     .setDescription('Api voltado para um sistema de nutrição')
                     .setVersion('1.0')
                     .addTag('Swagger')
                     .build();


  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-swagger', app, documentFactory);
    
  //LIBERAR CORS 
     app.enableCors({
      origin: 'http://localhost:3001', //URL DO FRONT-END
      methods: ['GET', 'POST']  //MÉTODOS QUE SERÃO LIBERADORS PARA O FRONT
});
    // Pipes
    app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
