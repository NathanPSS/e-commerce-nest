import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.useGlobalPipes(new ValidationPipe())
  
  app.use(session({
    name: 'Session-ID',
    secret: 'dsasdadsadsadsadsadsa',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 9999999,
      
    },
  }))

  const config = new DocumentBuilder()
    .setTitle('E-Commerce')
    .setDescription(
      'E-Commerce feito para projeto final da disciplina de PW1 *OBS as rotas protegidas so serão acessiveis mediante autenticação de suas devidas rotas de login não tentar pelo swagger'
    )
    .setVersion('1.0')
    .addTag('Api-Clientes')
    .addTag('Clientes')
    .addTag('Admin')
    .addTag('Admin-Produtos')
    .addTag('Api-Produtos')
    .addTag('Home')
    .addTag('Api-Pedidos')
    .addBasicAuth({type: 'http',scheme: 'basic'},'basic')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.use(passport.initialize())
  app.use(passport.session())
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
