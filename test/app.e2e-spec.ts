import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as session from 'express-session'
import * as request from 'supertest'
import { AppModule } from "../src/app.module"
import { Request } from 'express'


let app :INestApplication
describe('ClientesController',()=>{
  beforeAll(async ()=>{
    const moduleREf = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = moduleREf.createNestApplication()
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
   await app.init()
  })

  it('Entrada sem Authenticação', ()=>{
    return request(app.getHttpServer())
    .get('/clientes/dashboard').expect(401)
   })
  it('Não Deve Permitir criar um novo usuario já cadastrado',()=>{
    return request(app.getHttpServer()).post('/api/clientes').send({
      email: 'steve@gmail.com',
      password: '123456',
      nome: 'irineu',
      telefone: '9999223121'
    }).expect(403)
  })
  it('Não Deve Permitir criar um usuario com dados invalidos',() =>{
    return request(app.getHttpServer()).post('/api/clientes').send({
      email: 'ste.com',
      password: '123456',
      nome: 'irineu',
      telefone: '9999223121'
    }).expect(400)
  })
  it('Deve ler um Cliente',() =>{
    return request(app.getHttpServer()).get('/api/clientes/?id=15').expect(200)
  })
})
afterAll(() =>{
  app.close()
})
