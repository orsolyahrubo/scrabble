import request from 'supertest';
import mongoose from 'mongoose';
import logger from '../src/logger';
import app from '../src/app';
import config from '../src/config';
import { UserModel } from '../src/user/user.model';
import { GameModel } from '../src/game/game.model';
import { expect, beforeAll, afterAll, test } from '@jest/globals';

const DB_URI = `${config.testDb.uri}_game`;
const defaultSecretKey = config.jwtSecret;
let idOfUser: Object;
let result: any;
let tokenOfUser: string;
let idOfGame: Object;

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
    const userInDatabase = await UserModel.create(userToRegister);
    idOfUser = userInDatabase._id;
    config.jwtSecret = 'thisisaspecialsecret';

    const exampleGame = {
        players: [
            {
                userId: "1",
                currentHand: [
                    { value: "A", score: 1 },
                    { value: "B", score: 2 },
                    { value: "C", score: 3 },
                    { value: "D", score: 4 },
                    { value: "E", score: 5 },
                    { value: "F", score: 6 },
                    { value: "G", score: 7 },
                ]
            },
            {
                userId: idOfUser.toString(),
                currentHand: [
                    { value: "A", score: 1 },
                    { value: "B", score: 2 },
                    { value: "C", score: 3 },
                    { value: "D", score: 4 },
                    { value: "E", score: 5 },
                    { value: "F", score: 6 },
                    { value: "G", score: 7 },
                ]
            }
        ],
        bag: [
            { value: "A", score: 1 },
            { value: "B", score: 2 },
            { value: "C", score: 3 },
            { value: "D", score: 4 },
            { value: "E", score: 5 },
            { value: "F", score: 6 },
            { value: "G", score: 7 },
        ],
        moves: [
            {
                userId: "1",
                tile: { value: "A", score: 1 },
                position: { x: 0, y: 0 }
            }
        ],
        currentTurn: "1",
        board: [
            {
                tile: { value: "A", score: 1 },
                position: { x: 0, y: 0 }
            }
        ]
    }
    const gameInDatabase = await GameModel.create(exampleGame);
    idOfGame = gameInDatabase._id;

    result = await request(app).post('/api/login').send({
        email: 'tester@tester.com',
        password: '12345678',
    });
    tokenOfUser = result.body.token;
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

test('GET /api/game should throw 403 if no token is provided', (done) => {
    const invalidToken = '';
    request(app)
        .get('/api/games')
        .set('Authorization', `${invalidToken}`)
        .expect(403)
        .end((err) => {
            if (err) return done(err);
            return done();
        });
});
test('GET /api/game should throw 401 if invalid token is provided', (done) => {
    const invalidToken = 'invalidtoken';
    request(app)
        .get('/api/games')
        .set('Authorization', `Bearer ${invalidToken}`)
        .expect(401)
        .end((err) => {
            if (err) return done(err);
            return done();
        })
});
test('GET /api/game should return 200 and an array of games of user if valid token is provided', (done) => {
    request(app)
        .get('/api/games')
        .set('Authorization', `Bearer ${tokenOfUser}`)
        .expect(200)
        .end((err, data) => {
            if (err) return done(err);
            expect(data.body).toBeTruthy();
            return done();
        });
});
test('GET /api/game/:gameId should throw 403 if no token is provided', (done) => {
    const invalidToken = '';
    request(app)
        .get(`/api/games/${idOfGame}`)
        .set('Authorization', `${invalidToken}`)
        .expect(403)
        .end((err) => {
            if (err) return done(err);
            return done();
        });
});
test('GET /api/game/:gameId should throw 401 if invalid token is provided', (done) => {
    const invalidToken = 'invalidtoken';
    request(app)
        .get(`/api/games/${idOfGame}`)
        .set('Authorization', `Bearer ${invalidToken}`)
        .expect(401)
        .end((err) => {
            if (err) return done(err);
            return done();
        })
});
test('GET /api/game/:gameId should return 200 and a specific game of user if valid token and gameId is provided', (done) => {
    request(app)
        .get(`/api/games/${idOfGame}`)
        .set('Authorization', `Bearer ${tokenOfUser}`)
        .expect(200)
        .end((err, data) => {
            if (err) return done(err);
            expect(data.body).toBeTruthy();
            return done();
        });
});