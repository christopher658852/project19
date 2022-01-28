var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var score= 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImg)
  ghost.scale=0.3
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}

function draw() {
  background(200);

   
  if(tower.y  > height ){
    tower.y = height/2;
  }
  score = score + Math .round(getFrameRate()/100);
  if(gameState==="play"){


    tower.velocityY  =  (6 + 3*score/100);

    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    }
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3;
    }
    if(keyDown("space")){
      ghost.velocityY=-10;
    }
    ghost.velocityY+=0.8;

    if(tower.y > 400){
      tower.y = 300;
    }
    spawnDoors();
    if(climbersGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end";
    } 
  }
  
  drawSprites();
  if(gameState==="end"){
    stroke("white");
    fill("white ") ;
    textSize(30);
    text("game over :(",230,250);
  }
  textSize(20);
  stroke("white"); 
  fill("white");
  text("Score: "+ score,20,50);
  
}

function spawnDoors(){
  if(frameCount%240===0){
    var door=createSprite(200,-50);
    var climber=createSprite(200,10);
    var invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;

    door.x=Math.round(random(120,400))
    climber.x=door.x;
    invisibleBlock.x=door.x;
    door.addImage("door",doorImg);
    climber.addImage("climber",climberImg);

    door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;

    ghost.depth=door.depth+1;
    door.lifetime=800;
    climber.lifetime=800;
    invisibleBlock.lifetime=800;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    invisibleBlock.debug=true;
  }
}
      