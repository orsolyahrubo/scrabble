import { Schema } from "mongoose";
import { GameModel } from "./game.model";

export const gameService = {
    async getGames({ userId }: { userId: string }) {
        const games = (await GameModel.find().elemMatch('players', { userId }));
        // const games = await GameModel.find().where('players').elemMatch(userId );
        return games;
    }
}