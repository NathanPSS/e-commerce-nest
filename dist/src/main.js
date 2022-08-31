"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(session({
        name: 'Session-ID',
        secret: 'dsasdadsadsadsadsadsa',
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 9999999,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('E-Commerce')
        .setDescription('E-Commerce feito para projeto final da disciplina de PW1 *OBS as rotas protegidas so serão acessiveis mediante autenticação de suas devidas rotas de login não tentar pelo swagger')
        .setVersion('1.0')
        .addTag('Api-Clientes')
        .addTag('Clientes')
        .addTag('Admin')
        .addTag('Admin-Produtos')
        .addTag('Api-Produtos')
        .addTag('Home')
        .addTag('Api-Pedidos')
        .addBasicAuth({ type: 'http', scheme: 'basic' }, 'basic')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.use(passport.initialize());
    app.use(passport.session());
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map