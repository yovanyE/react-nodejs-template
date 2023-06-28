
const request=require('supertest');
const agencyrouter=require('../routes/agencia.router');
const mysql =  require('../database');
const app=require('./app');


afterAll(async () => {
    await mysql.end();
});

describe('GET /',()=>{
    it("Valores correctos retorna un 200", async ()=>{
        const res = await request(app.use(agencyrouter))
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
describe('POST /agencia',()=>{
  
    it("Insertar agencias con prueba unitaria", async()=>{
        const res = await request(app.use(agencyrouter))
        .post('/')
        .send({
            "nombre":"tst unit",
            "latitud":12.6,
            "longitud":23,
            "cantidad_personas":0,
            "capacidad_persona":200
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.Success).toBe('Agencia registrado');
    });

    it("Insertar agencias datos incorrectos", async()=>{
        const res = await request(app.use(agencyrouter))
        .post('/')
        .send({
            "nombre":"tst unit",
            "latitud":12.6,
            "longitud":"h",
            "cantidad_personas":"h",
            "capacidad_persona":200
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
    it("Insertar agencias con parametros incompletos", async()=>{
        const res = await request(app.use(agencyrouter))
        .post('/')
        .send({
            "latitud":12.6,
            "longitud":"h",
            "cantidad_personas":"h",
            "capacidad_persona":200
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
});


describe('PUT / ',()=>{
    test("aCTUALIZAR agencias con prueba unitaria", async()=>{
        const res = await request(app.use(agencyrouter))
        .put('/')
        .send({
            "nombre":"Unidad test",
            "latitud":12.6,
            "longitud":23,
            "cantidad_personas":0,
            "capacidad_persona":200,
            "idagencia":8
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
    test("Actualizar agencias con datos incorrectos", async()=>{
        const res = await request(app.use(agencyrouter))
        .put('/')
        .send({
            "nombre":"Unidad test",
            "latitud":12.6,
            "longitud":23,
            "cantidad_personas":0,
            "capacidad_persona":"h",
            "idagencia":8
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
    test("Actualizar agencias con parametros incompletos", async()=>{
        const res = await request(app.use(agencyrouter))
        .put('/')
        .send({
            "latitud":12.6,
            "longitud":23,
            "cantidad_personas":0,
            "capacidad_persona":"h",
            "idagencia":8
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
});