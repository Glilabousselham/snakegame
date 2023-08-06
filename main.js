const framePerSecond = 5;
// board dimentions
const POS_DIMENTION = 10;
const BOARD_HEIGHT = 30;// this mean 40 * position dimenion
const BOARD_WIDTH = 50;// this mean 40 * position dimenion

// board html element
const board = document.getElementById("game-borad")


// set width and height
board.style.height = toPixels(BOARD_HEIGHT, POS_DIMENTION);
board.style.width = toPixels(BOARD_WIDTH, POS_DIMENTION);
// fill squares
const BOARD_POSITIONS = fillBoardAndReturnPositionsAsMatrix(board, POS_DIMENTION, BOARD_HEIGHT, BOARD_WIDTH)

const snake = new Snake();

// on change direction
window.onkeydown = (e) => {
    e.preventDefault();
    const key = e.code
    const keys = {
        ArrowUp: "U",
        ArrowDown: "D",
        ArrowLeft: "L",
        ArrowRight: "R",
    }
    if (keys[key] !== undefined) {
        snake.changeDirection = keys[key];
    }
}

const ball = {
    position: { x: 20, y: 0 }
};

// this function will execute many times per second and its deponds on the framePerSecond constant
function frame() {

    // update snake position 
    snake.move(ball);

    !ball.position && showBall(BOARD_POSITIONS, snake, ball)
    // draw the snake on the screen 
    drawSnake(BOARD_POSITIONS, snake, ball)

}

var stop = true;


frame()

setInterval(async () => {


    try {
        !stop && frame()


    } catch (error) {
        stop = true;
        exceptionHandler(error)
    }


}, 1000 / framePerSecond);








document.getElementById("Up").onclick = () => {
    snake.changeDirection = "U"
}
document.getElementById("Down").onclick = () => {
    snake.changeDirection = "D"
}
document.getElementById("Left").onclick = () => {
    snake.changeDirection = "L"
}
document.getElementById("Right").onclick = () => {
    snake.changeDirection = "R"
}
document.getElementById("toggle").onclick = () => {
    stop = !stop
}