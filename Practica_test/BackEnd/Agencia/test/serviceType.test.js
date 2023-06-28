const serviceTypeRouter=require('../routes/serviceType.router');
const mysql =  require('../database');
const request=require('supertest');
const app=require('./app');

afterAll(async () => {
    await mysql.end();
});

describe('POST / ',()=>{
    test("Insertar tipo servicio con prueba unitaria", async()=>{
        const res = await request(app.use(serviceTypeRouter))
        .post('/')
        .send({
            "descripcion":"test tipo servicio"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test("Insertar tipo servicio con parametro incorrecto", async()=>{
        const res = await request(app.use(serviceTypeRouter))
        .post('/')
        .send({
            "descripc":"test tipo servicio"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
});

describe('PUT / ',()=>{
    test("aCTUALIZAR TIPO SERVICIO", async()=>{
        const res = await request(app.use(serviceTypeRouter))
        .put('/')
        .send({
            "descripcion":"consulta actualizada",
            "idtiposervicio":5
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test("aCTUALIZAR TIPO SERVICIO con parametro incorrecto ", async()=>{
        const res = await request(app.use(serviceTypeRouter))
        .put('/')
        .send({
            "descripcion":"consulta actualizada",
            "idtiposervi":5
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
});

describe('GET /',()=>{
    test("cONSULTAR CATALOGO TIPO SERVICIO", async ()=>{
        const res = await request(app.use(serviceTypeRouter))
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});