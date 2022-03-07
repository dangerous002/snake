class CreateField{
    constructor(){
        this.config = {
            elementsX: 10,
            elementsY: 10,
        };
        this.gameField = document.getElementById('game-field');
        this.excelTag = '<div class="excel"></div>';
    }

    drawField(config = this.config, gameField = this.gameField, excelTag = this.excelTag){
        for ( let i = 1; i < (config.elementsX * config.elementsY) + 1; i++ ) {
            gameField.innerHTML += excelTag;
        }

        let excel = document.getElementsByClassName('excel');

        let x = 1;
        let y = 10;
        
        for (let i = 0; i < excel.length; i++) {
            if (x > config.elementsX) {
                x = 1;
                y--;
            }
        
            excel[i].setAttribute('posX', x);
            excel[i].setAttribute('posY', y);
            x++;
        }
    }
}

//создаем змейку
class createSnake{
    constructor(){
        this.cordinates = this.generateSnake();
        this.snakeBodyPos = this.generateSnakeBody();
        this.config = {
            elementsX: 10,
            elementsY: 10,
        };
    }

    //генерация позиции змейки
    generateSnake(configs = this.config){
        let config = {
            elementsX: 10,
            elementsY: 10,
        };

        let posX = Math.round(Math.random() * (config.elementsX - 3) + 3);
        let posY = Math.round(Math.random() * (config.elementsY - 1) + 1);

        return [posX, posY];
    }

    //генерация тела змейки
    generateSnakeBody(cordinates = this.cordinates){
        return [document.querySelector('[posX = "' + cordinates[0] + '"][posY = "' + cordinates[1] + '"]'), document.querySelector('[posX = "' + (cordinates[0]-1) + '"][posY = "' + cordinates[1] + '"]'), document.querySelector('[posX = "' + (cordinates[0]-2) + '"][posY = "' + cordinates[1] + '"]')];
    }

    //отрисовываем змею
    drawSnake(snakeBody = this.snakeBodyPos){
        for (let i = 0; i < snakeBody.length; i++) {
            snakeBody[i].classList.add('snakeBody');
        }
        
        snakeBody[0].classList.add('head');
    }

    //движения
    move(snakeBody = this.snakeBodyPos, config = this.config){
        let snakeBodyBody = snakeBody;
        let configs = config;
        function move(snakeBody = snakeBodyBody, config = configs){
            let snakeCordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
            snakeBody[0].classList.remove('head');
            snakeBody[0].classList.add('snakeBody');
            snakeBody[snakeBody.length-1].classList.remove('snakeBody');
            snakeBody.pop();
        
            if(snakeCordinates[0] < config.elementsX){
                snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0]+1) + '"][posY = "' + snakeCordinates[1] + '"]'));
            } else {
                snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCordinates[1] + '"]'));
            }
        
            snakeBody[0].classList.add('head');
            for(let i = 0; i < snakeBody; i++) {
                snakeBody[i].classList.add('snakeBody');
            }
        }

        let interval = setInterval(move, 600);
    }
}

//создаем яблоко
class addApple{
    constructor(){
        this.config = {
            elementsX: 10,
            elementsY: 10,
        };
    }

    drawApple(config = this.config){
        function generateApple(config){
            let posX = Math.round(Math.random() * (config.elementsX - 1) + 1);
            let posY = Math.round(Math.random() * (config.elementsY - 1) + 1);

            return [posX, posY];
        }

        function appleCheck(appleCordinates){
            let apple = document.querySelector('[posX = "' + appleCordinates[0] + '"][posY = "' + appleCordinates[1] + '"]');
            
            while(apple.classList.contains('snakeBody')){
                apple = document.querySelector('[posX = "' + appleCordinates[0] + '"][posY = "' + appleCordinates[1] + '"]');
            }
    
            return apple;
        }

        function draw(apple){
            apple.classList.add('apple');
        }

        let appleCordinates = generateApple(config);
        let appleChecked = appleCheck(appleCordinates);

        draw(appleChecked);
    }
}



let field = new CreateField;
field.drawField();

let snake = new createSnake;
snake.drawSnake();
snake.move();

let apple = new addApple;
apple.drawApple();

