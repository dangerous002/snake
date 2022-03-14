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

class Apple{
    create(){
        let posX = Math.round(Math.random() * (10 - 1) + 1);
        let posY = Math.round(Math.random() * (10 - 1) + 1);

        let coordinates = [posX, posY];

        let apple = document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]');
            
        while(apple.classList.contains('snakeBody')){
            apple = document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]');
        }
    
        apple.setAttribute('id', 'apple');
    }
    
    check(){
        if(document.querySelector('#apple').classList.contains('snakeHead')){
            return true;
        }
    }
}

class Snake{
    constructor(){

    }

    create(){
        let direction = 'right';

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

        function move(snakeBody = snake, directionMove = direction){
            let direction = directionMove;
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

        //listening to keydown of keyboard arrows
        window.addEventListener('keydown', function(e){
            if (e.keyCode == 37 && direction != 'right' && direction != 'left') {
                direction = 'left';
            }
            else if (e.keyCode == 38 && direction != 'down' && direction != 'up') {
                direction = 'up';
            }
            else if (e.keyCode == 39 && direction != 'left' && direction != 'right') {
                direction = 'right';
            }
            else if (e.keyCode == 40 && direction != 'up' && direction != 'down') {
                direction = 'down';
            }
        });

        //listening to click of screen arrows
        for(let index = 0; index < 4; index++){
            $('.buttons>div')[index].addEventListener('click', function(event){
                if($('.buttons>div')[index].getAttribute('direction') == 'up' && direction != 'down' && direction != 'up'){
                    direction = 'up';
                }
            });
            $('.buttons>div')[index].addEventListener('click', function(event){
                if($('.buttons>div')[index].getAttribute('direction') == 'left' && direction != 'right' && direction != 'left'){
                    direction = 'left';
                }
            });
            $('.buttons>div')[index].addEventListener('click', function(event){
                if($('.buttons>div')[index].getAttribute('direction') == 'down' && direction != 'up' && direction != 'down'){
                    direction = 'down';
                }
            });
            $('.buttons>div')[index].addEventListener('click', function(event){
                if($('.buttons>div')[index].getAttribute('direction') == 'right' && direction != 'left' && direction != 'right'){
                    direction = 'right';
                }
            });
        }

        //listening for WASD buttons of keyboard
        window.addEventListener('keydown', function(event){
            if (event.keyCode == '87' && direction != 'down' && direction != 'up') {
                direction = 'up';
            } else if (event.keyCode == '65' && direction != 'right' && direction != 'left') {
                direction = 'left';
            } else if (event.keyCode == '83' && direction != 'up' && direction != 'down') {
                direction = 'down';
            } else if (event.keyCode == '68' && direction != 'left' && direction != 'right') {
                direction = 'right';
            }
        });
        
        setInterval(move, 200);
        
    }
}

//creating objects
let fieldObj = new Field;
let snakeObj = new Snake;
let appleObj = new Apple;

//creating main function
function gameLoop(field = fieldObj, snake = snakeObj, apple = appleObj){
    
    field.create();
    snake.create();
    apple.create();

    setInterval(function(){
        if(apple.check()){
            $('#apple').removeAttr('id');
            apple.create();
        }
    }, 200);
    
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

function giveStyles(){
    $('.field').css({
        'opacity':'1',
        'box-shadow':'5px 5px 5px #000',
    });
    $('.buttons').css({
        'opacity':'1',
    });
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
            giveStyles();
            gameLoop();
        }, 2000);

        setTimeout(function(){
            $('.field').css({
                'margin-top':'100px',
            });
        }, 1500);
    });

});
