const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30

let snake = [ {x:270,y:270}]

const randomNumber = (min, max) => {
    return Math.round(Math.random()*(max - min)+min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number/30) * 30
}

const food = {
        x:randomPosition(), 
        y:randomPosition(), 
        color: "red"
    }

let direction, loopId

const drawFood = () => {

    const {x,y,color} = food

    ctx.shadowColor = color
    ctx.shadowBlur = 50
    ctx.fillStyle = color
    ctx.fillRect(x,y, size, size)
    ctx.shadowBlur = 0
}

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
    if (!direction) return

    const head = snake[snake.length -1]

    if(direction == "right") {
        snake.push({x: head.x + size, y: head.y})
    }
    if(direction == "left") {
        snake.push({x: head.x - size, y: head.y})
    }
    if(direction == "down") {
        snake.push({x: head.x, y: head.y + size})
    }
    if(direction == "up") {
        snake.push({x: head.x, y: head.y - size})
    }

    snake.shift()
}

const chackEat = () => {
    const head = snake[snake.length -1]

    if (head.x == food.x && head.y == food.y){
        snake.push(head)

        food.x = randomPosition()
        food.y = randomPosition()
    }
}

const checkCollision = () => {
    const head = snake[snake.length -1]
    const canvasLimit = canvas.widht - size
    const neckIndex = snake.length -2
    const wallCollision = head.x < 0 || head.x > 570 || head.y < 0 || head.y > 570

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if (wallCollision || selfCollision){
        gameOver()
        alert("se fodeu")
        snake = [ {x:270,y:270}]
    }
}

const gameOver = () => {
    direction = undefined
}

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0,0,600,600)

    drawFood()
    moveSnake()
    drawSnake() 
    chackEat()
    checkCollision()
    loopId = setInterval(() => {
        gameLoop()
    }, 300)
}

gameLoop()

document.addEventListener("keydown", ({ key }) =>{
    if (key == "d" && direction != "left"){
        direction = "right"
    }
    if (key == "a" && direction != "right"){
        direction = "left"
    }
    if (key == "w" && direction != "down"){
        direction = "up"
    }
    if (key == "s" && direction != "up"){
        direction = "down"
    }
})
