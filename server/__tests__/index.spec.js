import '@babel/polyfill';
import request from 'supertest';
import app from '../app';

describe('Testing the default Home API', () => {
    test('Default Home API with welcome message', async () => {
        const response = await request(app).get('/');
        expect(response.body).toMatchSnapshot();;
        expect(response.statusCode).toBe(200);
    })
});
