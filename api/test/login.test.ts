import request from 'supertest';
import mongoose from 'mongoose';
import logger from '../src/logger';
import app from '../src/app';
import config from '../src/config';
import { UserModel } from '../src/user/user.model';
import { expect, beforeAll, afterAll, test } from '@jest/globals';

const DB_URI = `${config.testDb.uri}_login`;
const defaultSecretKey = config.jwtSecret;
let result: any;

beforeAll(async () => {
    mongoose.set('strictQuery', true);
    const connectionResult = await mongoose.connect(DB_URI);
    await mongoose.connection.db.dropDatabase();
    logger.info(`Connected to ${connectionResult.connection.name} database`);

    const userToRegister = {
        name: 'Tester',
        email: 'tester@tester.com',
        password: '$2b$10$UJdRsD0kJ0NXojQ5I6OGIOC1z0sHKZDJGTXeJqR3Qe8Yyp55rSLji',
    };
    result = await UserModel.create(userToRegister);
    config.jwtSecret = 'thisisaspecialsecret';
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

test('POST /api/login with valid data should respond with 200', (done) => {
    const userToLogin = {
        email: 'tester@tester.com',
        password: '12345678',
    }

    request(app)
        .post('/api/login')
        .send(userToLogin)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, data) => {
            if (err) return done(err);
            expect(data.body.token).toBeTruthy();
            return done();
        });
}
);
test('POST /api/login with wrong password should respond with 400', (done) => {
    const userToLogin = {
        email: 'tester@tester.com',
        password: 'wrongpassword',
    }
    request(app)
        .post('/api/login')
        .send(userToLogin)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err) => {
            if (err) return done(err);
            return done();
        });
}
);
test('POST /api/login with missing password should respond with 422', (done) => {
    const userToLogin = {
        email: 'tester@tester.com',
        password: '',
    }
    request(app)
        .post('/api/login')
        .send(userToLogin)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422)
        .end((err) => {
            if (err) return done(err);
            return done();
        });
}
);