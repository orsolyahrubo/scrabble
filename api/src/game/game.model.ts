import mongoose, { Types } from "mongoose";

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
    players: Player[],
    bag: Tile[],
    moves: Move[],
    currentTurn: string,
    board: BoardState[],
}

const gameSchema = new mongoose.Schema<Game>({
    players: [{ type: mongoose.Schema.Types.Array, ref: 'Player', required: true }],
    bag: [{ type: mongoose.Schema.Types.Array, ref: 'Tile', required: true }],
    moves: [{ type: mongoose.Schema.Types.Array, ref: 'Move', required: true }],
    currentTurn: { type: String, required: true },
    board: [{ type: mongoose.Schema.Types.Array, ref: 'BoardState', required: true }],
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