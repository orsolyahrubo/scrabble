import mongoose, { Types } from "mongoose";
import { platform } from "os";

export type Tile = {
    value: string,
    score: number,
}

export type Player = {
    userId: string,
    currentHand: Tile[],
}

export type Position = {
    x: number,
    y: number,
}

export type Move = {
    userId: string,
    tile: Tile,
    position: Position,
}

export type BoardState = {
    tile: Tile,
    position: Position,
}

export type Game = {
    players: Types.DocumentArray<Player>,
    bag: Tile[],
    moves: Move[],
    currentTurn: string,
    board: BoardState[],
}

const gameSchema = new mongoose.Schema<Game>({
    players: [{ userId: { type: String, required: true }, currentHand: [{ value: { type: String, required: true }, score: { type: Number, required: true } }] }],
    bag: [{ value: { type: String, required: true }, score: { type: Number, required: true } }],
    moves: [{ userId: { type: String, required: true }, tile: { value: { type: String, required: true }, score: { type: Number, required: true } }, position: { x: { type: Number, required: true }, y: { type: Number, required: true } } }],
    currentTurn: { type: String, required: true },
    board: [{ tile: { value: { type: String, required: true }, score: { type: Number, required: true } }, position: { x: { type: Number, required: true }, y: { type: Number, required: true } } }],
    // players: [{ type: mongoose.Schema.Types.Array, ref: 'Player', required: true }],
    // bag: [{ type: mongoose.Schema.Types.Array, ref: 'Tile', required: true }],
    // moves: [{ type: mongoose.Schema.Types.Array, ref: 'Move', required: true }],
    // currentTurn: { type: String, required: true },
    // board: [{ type: mongoose.Schema.Types.Array, ref: 'BoardState', required: true }],
},
    {
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret.__v;
                delete ret._id;
            }
        },
        toObject: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret.__v;
                delete ret._id;
            }
        }
    });

export const GameModel = mongoose.model<Game>("GameModel", gameSchema, "games");

export function createGame() {
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

    GameModel.create(exampleGame);

}