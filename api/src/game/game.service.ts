import { GameModel, Game } from "./game.model";

export const gameService = {
    async getGames(userId: string): Promise<Game[]> {
        const games = (await GameModel.find().elemMatch('players', { userId }));
        return games;
    },
    async getOneGame(gameId: string, userId: string): Promise<Game> {
        const game = (await GameModel.findOne({ _id: gameId }).elemMatch('players', { userId }));
        if (!game) {
            const err: any = new Error('There is no such game or you are not a part of it.');
            err.status = 400;
            throw err;
        }
        return game;
    }
}