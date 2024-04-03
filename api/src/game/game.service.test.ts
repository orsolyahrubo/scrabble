import { GameModel } from './game.model';
import { gameService } from './game.service';
import { expect, test } from '@jest/globals';

let exampleGame: any;

beforeAll(() => {

    exampleGame = {
        players: [
            {
                userId: "firstUserId",
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
                userId: "2",
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
                userId: "2",
                tile: { value: "A", score: 1 },
                position: { x: 0, y: 0 }
            }
        ],
        currentTurn: "2",
        board: [
            {
                tile: { value: "A", score: 1 },
                position: { x: 0, y: 0 }
            }
        ]
    }
    jest.fn().mockImplementation(() => Promise.resolve(exampleGame));
}
);

afterAll(() => {
    jest.clearAllMocks();
});

test('Get games should return a list of games if these belong to the user who is logged in and has valid token', async () => {

    GameModel.find = jest.fn().mockImplementation(() => ({
        elemMatch: jest.fn().mockImplementation(() => Promise.resolve([exampleGame]))
    }));

    const games = await gameService.getGames("firstUserId");

    expect(games.length).toBe(1);
});
test('Get one game should throw error if the game does not exist or the user is not part of it', async () => {

    GameModel.findOne = jest.fn().mockImplementation(() => ({
        elemMatch: jest.fn().mockImplementation(() => Promise.reject(new Error('There is no such game or you are not a part of it.')))
    }));

    await expect(gameService.getOneGame("randomId", "firstUserId")).rejects.toThrow();
});
test('Get one game should return a specific game if it exists and the user is part of it', async () => {

    GameModel.findOne = jest.fn().mockImplementation(() => ({
        elemMatch: jest.fn().mockImplementation(() => Promise.resolve(exampleGame))
    }));

    const game = await gameService.getOneGame("randomId", "firstUserId");
    expect(game).toBe(exampleGame);
});