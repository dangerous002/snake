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
        
        for ( let i = 1; i < (parseInt(document.getElementById('configs').getAttribute('elementsX')) * parseInt(document.getElementById('configs').getAttribute('elementsY'))) + 1; i++ ) {
            gameField.innerHTML += excelTag;
        }

        let excel = document.getElementsByClassName('excel');

        let x = 1;
        let y = parseInt(document.getElementById('configs').getAttribute('elementsY'));
        
        for (let i = 0; i < excel.length; i++) {
            if (x > parseInt(document.getElementById('configs').getAttribute('elementsX'))) {
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
            elementsX: parseInt(document.getElementById('configs').getAttribute('elementsX')),
            elementsY: parseInt(document.getElementById('configs').getAttribute('elementsY')),
        };
    }

    //генерация позиции змейки
    generateSnake(configs = this.config){
        let config = {
            elementsX: parseInt(document.getElementById('configs').getAttribute('elementsX')),
            elementsY: parseInt(document.getElementById('configs').getAttribute('elementsY')),
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
    drawSnake(snakeBody = this.generateSnakeBody()){
        for (let i = 0; i < snakeBody.length; i++) {
            snakeBody[i].classList.add('snakeBody');
        }
        
        snakeBody[0].classList.add('head');
    }

    //движения
    move(config = this.config, snakeBodyBody = this.generateSnakeBody()){
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

        let interval = setInterval(move, 250);
    }
}

//создаем яблоко
class addApple{
    constructor(){
        this.config = {
            elementsX: parseInt(document.getElementById('configs').getAttribute('elementsX')),
            elementsY: parseInt(document.getElementById('configs').getAttribute('elementsY')),
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


/*
let field = new CreateField;
let snake = new createSnake;
let apple = new addApple;
*/

/*
field.drawField();
snake.drawSnake();
snake.move();
apple.drawApple();
*/

function gameLoop(field = new CreateField, snake = new createSnake, apple = new addApple){
    field.drawField();
    snake.drawSnake();
    snake.move();
    apple.drawApple();
}

let configSubmit = document.getElementById('config-submit');

configSubmit.addEventListener('click', function(){
    if(parseInt(document.getElementById('elementsX').value) >= 10 && parseInt(document.getElementById('elementsX').value) <= 40 && parseInt(document.getElementById('elementsY').value) >= 10 && parseInt(document.getElementById('elementsY').value) <= 40){
        
        let elementsX = parseInt(document.getElementById('elementsX').value);
        let elementsY = parseInt(document.getElementById('elementsY').value);

        document.getElementById('configs').setAttribute('elementsX', elementsX);
        document.getElementById('configs').setAttribute('elementsY', elementsY);

        /*
            parseInt(document.getElementById('configs').getAttribute('elementsX'))
            parseInt(document.getElementById('configs').getAttribute('elementsY'))
        */

        document.getElementById('config').style.transform = 'translate(300px)';
        document.getElementById('config').style.opacity = '0';

        document.getElementById('popup').style.transform = 'translate(-300px)';
        document.getElementById('popup').style.opacity = '0';

        setTimeout(function(){
            document.getElementById('config').style.display = 'none';
            document.getElementById('popup').style.display = 'none';
            document.getElementById('game-field').style.display = 'flex';
            document.getElementById('game-field').style.width = (parseInt(document.getElementById('configs').getAttribute('elementsX')) * 30) + 'px';
            document.getElementById('game-field').style.height = (parseInt(document.getElementById('configs').getAttribute('elementsY')) * 30) + 'px';
        }, 1000)

        setTimeout(function(){
            document.getElementById('game-field').style.opacity = '1';
            gameLoop();
        }, 5000);

    } else {
        document.getElementById('popup').style.marginTop = '0';
        document.getElementById('popup').style.opacity = '1';
    }

});
