//creating classes
class Field{
    constructor(){
        this.excelTag = '<div class="excel"></div>'
    }

    create(excelTag = this.excelTag){
        //adding excels into html
        for(let i = 1; i < 101; i++){
            document.getElementById('field').innerHTML += excelTag;
        }

        //adding coordintes to excels
        let excels = $('.excel');
        let posX = 1;
        let posY = 10;

        for(let i = 1; i < 101; i++){
            if(posX > 10){
                posX = 1;
                posY--;
            }
            excels[i-1].setAttribute('posX', posX);
            excels[i-1].setAttribute('posY', posY);
            posX++;
        }
    }
}

class Snake{
    constructor(){

    }

    create(){
        let directions = 'right';

        //getting random position
        let posX = Math.round(Math.random() * (10 - 3) + 3);
        let posY = Math.round(Math.random() * (10 - 1) + 1);

        let coordinates = [posX, posY];

        //genrate snake body
        let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')];
    
        //drawing snake
        for (let i = 0; i < snakeBody.length; i++) {
            snakeBody[i].classList.add('snakeBody');
        }
        
        snakeBody[0].classList.add('snakeHead');

        let snake = snakeBody;

        //movement

        function move(snakeBody = snake, direction = directions){
            let snakeCordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
            snakeBody[0].classList.remove('snakeHead');
            snakeBody[0].classList.add('snakeBody');
            snakeBody[snakeBody.length-1].classList.remove('snakeBody');
            snakeBody.pop();
            

            if (direction == 'right'){
                if(snakeCordinates[0] < 10){
                    snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0]+1) + '"][posY = "' + snakeCordinates[1] + '"]'));
                } else {
                    snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCordinates[1] + '"]'));
                }
            } else if (direction == 'left') {
                if(snakeCordinates[0] > 1) {
                    snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0]-1) + '"][posY = "' + snakeCordinates[1] + '"]'));
                } else {
                    snakeBody.unshift(document.querySelector('[posX = "' + 10 + '"][posY = "' + snakeCordinates[1] + '"]'));
                }
            } else if (direction == 'up') {
                if(snakeCordinates[1] < 10) {
                    snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "' + (+snakeCordinates[1]+1) + '"]'));
                } else {
                    snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "1"]'));
                }
            } else if (direction == 'down') {
                if(snakeCordinates[1] > 1) {
                    snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "' + (+snakeCordinates[1]-1) + '"]'));
                } else {
                    snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "' + 10 + '"]'));
                }
            } 

            snakeBody[0].classList.add('snakeHead');
            for(let i = 0; i < snakeBody; i++) {
                snakeBody[i].classList.add('snakeBody');
            }

        }

        window.addEventListener('keydown', function(e){
            if (e.keyCode == 37 && directions != 'right' && directions != 'left') {
                directions = 'left';
            }
            else if (e.keyCode == 38 && directions != 'down' && directions != 'up') {
                directions = 'up';
            }
            else if (e.keyCode == 39 && directions != 'left' && directions != 'right') {
                directions = 'right';
            }
            else if (e.keyCode == 40 && directions != 'up' && directions != 'down') {
                directions = 'down';
            }
        });
        
        setInterval(move, 200);
        
    }
}

//creating objects
let fieldObj = new Field;
let snakeObj = new Snake;

//creating main function
function gameLoop(field = fieldObj, snake = snakeObj){
    
    field.create();
    snake.create();
    
}

function removeStyles(){

    $('.start-button').css({
        'transition':'2s ease',
        'margin-top':'-45vh',
        'opacity':'0',
    });

    setTimeout(function(){
        $('.start-button').css({
            'display':'none',
        });
    }, 1000);
    
}

//on document ready
$(document).ready(function(){

    $('.start-button').css({
        'margin-top': '45vh',
    });

    //on click
    $('.start-button').click(function(){
        removeStyles();

        console.log('Let\'s play!')

        $('.field').css({
            'display':'flex',
        });
        $('.buttons').css({
            'display':'flex',
        });
        
        //waiting 2 seconds and compilate code
        setTimeout(function(){
            $('.field').css({
                'opacity':'1',
                'box-shadow':'5px 5px 5px #000',
            });
            $('.buttons').css({
                'opacity':'1',
            });

            gameLoop();
        }, 2000);

        setTimeout(function(){
            $('.field').css({
                'margin-top':'100px',
            });
        }, 1500);
    });

});
