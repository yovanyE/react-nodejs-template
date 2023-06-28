const serviceRouter=require('../routes/serviceAgency.router');
const mysql=require('../database');

const request=require('supertest');
const app=require('./app');

afterAll(async () => {
    await mysql.end();
});

describe('POST / ',()=>{
    test("Insertar servicio agencias con prueba unitaria", async()=>{
        const res = await request(app.use(serviceRouter))
        .post('/')
        .send({
            "idagencia":1,
            "descripcion":"test unitario",
            "idtiposervicio":2
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test("Insertar servicio agencias con datos incorrectos", async()=>{
        const res = await request(app.use(serviceRouter))
        .post('/')
        .send({
            "idagencia":"2",
            "descripcion":"test unitario",
            "idtiposervicio":"hola"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
    test("Insertar servicio agencias con parametros incompletos", async()=>{
        const res = await request(app.use(serviceRouter))
        .post('/')
        .send({
            "idagencia":"2",
            "descripcion":"test unitario",
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
    test("Insertar servicio agencias con parametros incorrectos", async()=>{
        const res = await request(app.use(serviceRouter))
        .post('/')
        .send({
            "idagencia":"2",
            "descripcion":"test unitario",
            "idtiposerv":"hola"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
});

describe('GET /',()=>{
    test("Valores correctos retorna un 200", async ()=>{
       await  request(app.use(serviceRouter)).get('/')
        .expect('Content-Type', /json/)
        .expect(200);
        /*const res = await request(app.use(serviceRouter))
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);*/
    });
});

describe('POST / ',()=>{
    test("Buscar servicio de agencia por nombre, test unit", async()=>{
        await request(app.use(serviceRouter))
        .post('/byName')
        .send({
            "agency":"agencia"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test("Buscar servicio de agencia con tipo de dato incorrecto", async()=>{
        await request(app.use(serviceRouter))
        .post('/byName')
        .send({
            "agency":2
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});
