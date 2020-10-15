var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey,bg,monkey_running, invisibleGround, obstacle;
var score=0;
function preload(){
  backgroundImage = loadImage("jungle.jpg");
  monkey_running=loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png","Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  monkey_running1=loadAnimation("Monkey_10.png")
  Banana=loadImage("banana.png");
  obstacle1=loadImage("stone.png");
}
function setup() {
  createCanvas(500, 400);
  
  bg = createSprite(100,100,20,20);
  bg.addImage("bg",backgroundImage);
  bg.x= bg.width/2;
  bg.velocityX = -2;
  
  monkey = createSprite(50,300,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("Monkey", monkey_running1);
  monkey.scale=0.1;
  
  FoodGroup = new Group();
  ObstacleGroup = new Group();
  
  invisibleGround = createSprite(60,320,400,10);
  invisibleGround.visible = false;
}
 
function draw() {
  background(180);
  
  if(gameState === PLAY){
    if (bg.x < 0){
    bg.x = bg.width/2;
  }
    
    if(keyDown("space")) {
    monkey.velocityY = -10;
  }
    
  monkey.velocityY = monkey.velocityY + 0.8;
    
  spawnBananas();
  spawnObstacles();
    
    if(FoodGroup.isTouching(monkey)){
  FoodGroup.destroyEach();
  score=score+2;
      
  switch(score){
  case 10: monkey.scale=0.12;break;
  case 20: monkey.scale=0.14;break;
  case 30: monkey.scale=0.16;break;
  case 40: monkey.scale=0.18;break;
  default : break;
}
}
  }
  
  if(ObstacleGroup.isTouching(monkey)){
       gameState=END;
      monkey.changeAnimation("Monkey", monkey_running1);
       }
  if(gameState==END){
     monkey.velocityY=0;
     bg.velocityX=0;
    
    ObstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    ObstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
     }
  monkey.collide(invisibleGround);
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 400,20);
}

function spawnBananas() {
  if (World.frameCount % 160 === 0) {
    banana = createSprite(600,390,40,10);
    banana.y = Math.round(random(190,200));
    banana.addImage("Banana_1", Banana);
    banana.scale = 0.06;
    banana.velocityX = - 6;
    
     //assign lifetime to the variable
    banana.lifetime = 100;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(World.frameCount % 120 === 0) {
    var obstacle = createSprite(600,300,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage("stone.png", obstacle1);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 200;
    ObstacleGroup.add(obstacle);
  }
}