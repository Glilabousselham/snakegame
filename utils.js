// transform number to pixels
function toPixels(number, posDimention) {
    return (+number * +posDimention) + "px";
}

// fill the board with the squares
/**
 * 
 * @param {HTMLDivElement} board 
 * @param {number} posDimention 
 * @param {number} height 
 * @param {number} width 
 */
function fillBoardAndReturnPositionsAsMatrix(board, posDimention, height, width) {
    const matrix = [];
    let row = [];

    for (let y = 1; y <= height; y++) {
        row = []
        for (let x = 1; x <= width; x++) {
            const el = document.createElement("div");
            el.className = "square-position"
            el.id = `pos-y${y}-x${x}`
            el.style.width = toPixels(1, posDimention);
            el.style.height = toPixels(1, posDimention);

            row.push(el);
            board.appendChild(el);
        }

        matrix.push(row);
    }

    return matrix;
}



function drawSnake(matrix, snakeObject, ball) {


    for (const part of snakeObject.parts) {

        try {
            matrix[part.y][part.x].className = "square-position snake-part";

            if (part.head === true) {
                matrix[part.y][part.x].className += " head";
            }
        } catch (e) {
            throw new GameOverException()
        }
    }

    // clear old last part of the snake 
    if (snakeObject.oldLastPartPosition) {
        matrix[snakeObject.oldLastPartPosition.y][snakeObject.oldLastPartPosition.x].className = "square-position"
    }

    if (ball.position) {
        matrix[ball.position.y][ball.position.x].className = "square-position ball";
    }


}


function showBall(matrix, snakeObject, ball) {
    const yLength = matrix.length
    const xLength = matrix[0].length

    const busyX = [...new Set(snakeObject.parts.map(p => p.x))];
    const busyY = [...new Set(snakeObject.parts.map(p => p.y))];

    const availableX = Array.from(Array(xLength).keys()).filter(p => !busyX.includes(p));
    const availableY = Array.from(Array(yLength).keys()).filter(p => !busyY.includes(p));

    const randomXPosition = Math.floor(Math.random() * availableX.length + 1);
    const randomYPosition = Math.floor(Math.random() * availableY.length + 1);

    ball.position = {
        x: randomXPosition,
        y: randomYPosition
    }

}



