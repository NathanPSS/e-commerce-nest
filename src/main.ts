import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path'
import { env } from 'process';


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
  app.use(passport.initialize())
  app.use(passport.session())
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
