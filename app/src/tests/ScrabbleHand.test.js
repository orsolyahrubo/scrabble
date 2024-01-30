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
    it('If a tile is clicked and there is no currentTile than setCurrentTile function will be called with the clicked tile', () => {
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
    it('If a tile is clicked and there is a currentTile but with different id than tiles id than setCurrentTile function will be called with tile', () => {
        const currentHand = [
            { value: 'C', score: 3, id: 'randomID1' },
            { value: 'E', score: 5, id: 'randomID2' }
        ];
        const currentTile = { value: 'C', score: 3, id: 'randomID1' };
        const setCurrentTile = jest.fn()
        render(
            <GameContext.Provider value={{ currentHand, currentTile, setCurrentTile }}>
                <BrowserRouter>
                    <ScrabbleHand />
                </BrowserRouter>
            </GameContext.Provider>
        )
        fireEvent.click(screen.getByText(/E/i));
        expect(setCurrentTile).toHaveBeenCalledTimes(1);
        expect(setCurrentTile).toHaveBeenCalledWith({ value: 'E', score: 5, id: 'randomID2' });
    }
    )
    it('If a tile is clicked and there is a currentTile with the same id than setCurrentTile function will be called with null', () => {
        const currentHand = [
            { value: 'C', score: 3, id: 'randomID1' },
            { value: 'E', score: 5, id: 'randomID2' }
        ];
        const currentTile = { value: 'C', score: 3, id: 'randomID1' };
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
        expect(setCurrentTile).toHaveBeenCalledWith(null);
    }
    )
});