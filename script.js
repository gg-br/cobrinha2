const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30

const snake = [
    {x:20,y:20},
    {x:50,y:20}
]

let direction = "right"

const drawSnake = () => {
    ctx.fillStyle = "#ddd"

    snake.forEach((position, index)=>{
        if (index == snake.length - 1){
            ctx.fillStyle = "white"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () =>{
    const head = snake[snake.length -1]

    snake.shift()

    if(direction == "right") {
        snake.push({x: head.x + size, y: head.y})
    }
}

setInterval(() => {
    moveSnake()
    drawSnake() 
}, 300)

