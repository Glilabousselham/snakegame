class GameOverException extends Error {

}





function exceptionHandler(error) {
    if (error instanceof GameOverException) {
        // game over
        window.alert("game over")

        window.location.reload()
    }
}