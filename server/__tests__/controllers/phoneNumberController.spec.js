import '@babel/polyfill';
import request from 'supertest';
import app from '../../app';
import { clearFile } from '../../utils/helpers/PhoneNumberControllerHelper';
import seedNumbers from '../../utils/helpers/testHelpers';

describe('Testing the PhoneNumber Controller', () => {
    beforeAll(async () => {
        await clearFile();
        await seedNumbers();
      });
      afterAll(async () => {
        await clearFile();
      });
    test('Get /phonenumber - Getting the list of phone numbers', async () => {
        const response = await request(app).get('/api/phonenumbers');
        expect(response.body).toMatchSnapshot();
        expect(response.statusCode).toBe(200);
    });

    test('Get /sort - sorting the list of phone numbers in ascending order and finding max/min numbers', async () => {
        const response = await request(app).get('/api/sort?order=asc');
        expect(response.body).toMatchSnapshot();
        expect(response.statusCode).toBe(200);
    })
    test('Get /sort - sorting the list of phone numbers in descending order and finding max/min numbers', async () => {
        const response = await request(app).get('/api/sort?order=desc');
        expect(response.body).toMatchSnapshot();
        expect(response.statusCode).toBe(200);
    })
    test('Get /sort - sorting the list of phone numbers without order and finding max/min numbers', async () => {
        const response = await request(app).get('/api/sort');
        expect(response.body).toMatchSnapshot();
        expect(response.statusCode).toBe(200);
    });

    test('POST /phonenumbers - generating random phone numbers', async () => {
        const requestBody = {
            amount: 10
        }
        const response = await request(app).post('/api/phonenumbers').send(requestBody);
        expect(response.body.message).toEqual(`${requestBody.amount} phone number(s) successfully generated`);
        expect(response.body.data.total).toEqual(requestBody.amount);
        expect(response.body.data.phoneNumbers.length).toEqual(requestBody.amount);
        expect(response.statusCode).toBe(201);
    });

    test('POST /phonenumbers - generating random phone numbers above 500', async () => {
        const requestBody = {
            amount: 1000
        }
        const response = await request(app).post('/api/phonenumbers').send(requestBody);
        expect(response.body).toMatchSnapshot();
        expect(response.statusCode).toBe(400);
    });

    test('POST /phonenumbers - generating random phone numbers with no amount specified', async () => {
        const response = await request(app).post('/api/phonenumbers');
        expect(response.body).toMatchSnapshot();
        expect(response.statusCode).toBe(400);
    });

    test('Get /clear - clearing the list of phone numbers', async () => {
        const response = await request(app).delete('/api/clear');
        expect(response.body).toMatchSnapshot();
        expect(response.statusCode).toBe(200);
    });

    test('Get /phonenumber - Getting an empty list of phone numbers', async () => {
        const response = await request(app).get('/api/phonenumbers');
        expect(response.body).toMatchSnapshot();
        expect(response.statusCode).toBe(200);
    });
    test('Get /sort - sorting an empty list of phone numbers', async () => {
        const response = await request(app).get('/api/sort');
        expect(response.body).toMatchSnapshot();
        expect(response.statusCode).toBe(200);
    });
});




