export async function currentBoardMapper(board, rowI, columnI, tile) {
    const finalBoard = board.map((row, index) => {
        return row.map((element, index2) => {
            if (index === rowI && index2 === columnI) {
                return tile;
            }
            return element;
        });
    }
    )
    return finalBoard;
}