import { gameService } from "./game.service";
import { Response } from 'express';

export const gameController = {
    async get(req: any, res: Response, next: any) {
        const { userId } = req.headers.loggedInUserData;
        try {
            const gameList = await gameService.getGames(userId);
            const result = { games: gameList };
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
    async getOne(req: any, res: Response, next: any) {
        const { userId } = req.headers.loggedInUserData;
        const { gameId } = req.params;
        try {
            const game = await gameService.getOneGame(gameId, userId);
            res.status(200).json(game);
        } catch (error) {
            next(error);
        }
    }
}
