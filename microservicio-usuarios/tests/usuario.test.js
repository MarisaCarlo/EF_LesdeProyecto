const request = require('supertest');
const app = require('../src/app');


describe('API Usuarios', () => {

    test('GET usuarios', async () => {

        const res = await request(app)
            .get('/api/usuarios');

        expect(res.statusCode).toBe(200);

    });


    test('POST usuario', async () => {

        const res = await request(app)
            .post('/api/usuarios')
            .send({
                nombre: 'Juan',
                correo: 'juan@gmail.com',
                password: '123456',
                cargo: 'Supervisor'
            });

        expect(res.statusCode).toBe(201);

    });


    test('LOGIN usuario', async () => {

        const res = await request(app)
            .post('/api/usuarios/login')
            .send({
                correo: 'juan@gmail.com',
                password: '123456'
            });

        expect(res.statusCode).toBe(200);

    });

});