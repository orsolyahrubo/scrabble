import { gameService } from "./game.service";
import { Request, Response } from 'express';

export const gameController = {
    async get(req: Request, res: Response, next: any) {
        //userId will be coming from token
        // const { userId } = req.headers.loggedInUserData;
        let games;
        try {
            // games = await gameService.getGames(userId);
        } catch (err) {
            return next(err);
        }
        return res.status(200).json(games);
    }
}
