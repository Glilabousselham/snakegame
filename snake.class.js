class Snake {




    constructor(

    ) {
        this.parts = [
            { x: 9, y: 0, head: true },
            { x: 8, y: 0 },
            { x: 7, y: 0 },
            { x: 6, y: 0 },
            { x: 5, y: 0 },
            { x: 4, y: 0 },
            { x: 3, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 0 }
        ];

        /** @var {string} direction*/
        this.direction = "R" // =>  R - L - U - D

        this.oldLastPartPosition = null;

        this.directionLocked = false;
    }

    /**@param {string} d */
    set changeDirection(d) {
        if (this.directionLocked) return;

        if (
            ((this.direction === "R" || this.direction === "L") && (d === "R" || d === "L"))
            ||
            ((this.direction === "U" || this.direction === "D") && (d === "U" || d === "D"))
        ) {
            return;
        }
        this.direction = d;
        this.directionLocked = true;

    }

    checkIfEatsHimself = () => {
        for (let i = 1; i < this.parts.length; i++) {
            if (this.parts[0].x === this.parts[i].x && this.parts[0].y === this.parts[i].y) {
                throw new GameOverException;
            }
        }
    }

    checkIfTheHeadHitWalls = () => {

    }

    move(ball) {

        // check if the head position hit a ball 

        // hit walls

        // hit him self



        const newPos = {
            x: 0,
            y: 0
        }

        switch (this.direction) {
            case "R":
                newPos.x = 1;
                newPos.y = 0;
                break;


            case "L":
                newPos.x = -1;
                newPos.y = 0;
                break;

            case "U":
                newPos.x = 0;
                newPos.y = -1;
                break;

            default:
                newPos.x = 0;
                newPos.y = +1;
                break;
        }

        const newParts = [];

        for (let i = 0; i < this.parts.length; i++) {
            // move the head
            if (i === 0) {


                newParts.push({
                    x: this.parts[0].x + newPos.x,
                    y: this.parts[0].y + newPos.y,
                    head: true,
                })
                continue;
            }
            // move other parts

            newParts.push({
                x: this.parts[i - 1].x,
                y: this.parts[i - 1].y,
            })

        }

        // check is eated
        if (newParts[0].x === ball.position.x && newParts[0].y === ball.position.y) {

            ball.position = null;
            newParts.push(this.parts[this.parts.length - 1]);
        } else {
            this.oldLastPartPosition = this.parts[this.parts.length - 1];
        }

        this.parts = newParts


        // check if eat himself
        this.checkIfEatsHimself()

        this.directionLocked = false;



    }


}