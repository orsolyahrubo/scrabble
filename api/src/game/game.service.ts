import { Schema } from "mongoose";
import { GameModel } from "./game.model";

export const gameService = {
    async getGames(userId: Schema.Types.ObjectId) {
        // const games = (await GameModel.find().elemMatch('players', { userId }));
        const games = await GameModel.find().where('players').elemMatch({ userId });
        return games;
    }
}