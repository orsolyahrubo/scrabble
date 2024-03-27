import { gameService } from "./game.service";
import { Request, Response } from 'express';

export const gameController = {
    async get(req: Request, res: Response, next: any) {
        console.log('az controllerban talalhato req.headers', req.headers);
        // const { userId } = req.headers.loggedInUserData;
        try {
            const gameList = await gameService.getGames({ userId: '660293ce16b96772807eea62' });
            const result = { games: gameList };
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}
