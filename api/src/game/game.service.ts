import { GameModel, Game } from "./game.model";

export const gameService = {
    async getGames(userId: string) : Promise<Game[]> {
        const games = (await GameModel.find().elemMatch('players', { userId }));
        return games;
    }
}