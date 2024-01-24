import { render, screen, fireEvent, waitFor, queryByRole, getByText } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';
import ScrabbleHand from '../components/ScrabbleHand';

describe('ScrabbleHand', () => {
    it('Should render a message if there are no letters in the hand', () => {
        const currentHand = [];
        render(
            <GameContext.Provider value={{ currentHand }}>
                <BrowserRouter>
                    <ScrabbleHand />
                </BrowserRouter>
            </GameContext.Provider>
        )
        expect(screen.getByText(/There are no letters in your hand./i)).toBeInTheDocument();
    }
    )
    it('Should show the letters in the hand', () => {
        const currentHand = [
            { value: 'C', score: 3, id: 'randomID1' },
            { value: 'D', score: 4, id: 'randomID2' }
        ];
        render(
            <GameContext.Provider value={{ currentHand }}>
                <BrowserRouter>
                    <ScrabbleHand />
                </BrowserRouter>
            </GameContext.Provider>
        )
        expect(screen.getByText(/C/i)).toBeInTheDocument();
        expect(screen.getByText('D', { exact: true })).toBeInTheDocument();
        expect(screen.getByText('3', { exact: true })).toBeInTheDocument();
        expect(screen.queryByText('Y', { exact: true })).not.toBeInTheDocument();
    }
    )
    it('Should call currentTile when a tile is clicked', () => {
        const currentHand = [
            { value: 'C', score: 3, id: 'randomID1' },
            { value: 'D', score: 4, id: 'randomID2' }
        ];
        const currentTile = null;
        const setCurrentTile = jest.fn()
        render(
            <GameContext.Provider value={{ currentHand, currentTile, setCurrentTile }}>
                <BrowserRouter>
                    <ScrabbleHand />
                </BrowserRouter>
            </GameContext.Provider>
        )
        fireEvent.click(screen.getByText(/C/i));
        expect(setCurrentTile).toHaveBeenCalledTimes(1);
        expect(setCurrentTile).toHaveBeenCalledWith({ value: 'C', score: 3, id: 'randomID1' });
    }
    )
    it('Should we click on a tile it should be set to currentTile', () => {
        const currentHand = [
            { value: 'C', score: 3, id: 'randomID1' },
            { value: 'D', score: 4, id: 'randomID2' }
        ];
        const currentTile = null;
        const tileToSet = { value: 'C', score: 3, id: 'randomID1' };
        // need to mock setCurrentTile to return tileToSet
        const setCurrentTile = jest.fn(() => tileToSet);
        render(
            <GameContext.Provider value={{ currentHand, currentTile, setCurrentTile }}>
                <BrowserRouter>
                    <ScrabbleHand />
                </BrowserRouter>
            </GameContext.Provider>
        )
        console.log('tileToSet', tileToSet);
        const foundThatTile = screen.queryByDisplayValue(/3/i);
        console.log('foundThatTile', foundThatTile);
        fireEvent.click(screen.getByText(/C/i));
        console.log('currentTile', currentTile);
        waitFor(() => expect(currentTile).toEqual(tileToSet));
    }
    )
});