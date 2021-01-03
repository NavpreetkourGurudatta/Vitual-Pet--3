//Create variables here
var Dog,happydog
var FoodS,FoodStock
var database
var score = 0
var writeStoke
var Button
var fedTime,lastFed
var foodObj
var changinggameState,readinggameState
var bedroom,garden,washroom

function preload()
{
  //load images here
  DogIMG = loadImage("Dog.png");
  happydog = loadImage('happydog.png')
  bedroomIMG = loadImage("Bed Room.png");
  gardenIMG = loadImage("Garden.png");
  washroomIMG  = loadImage ("Wash Room.png");
deadIMG = loadImage("deadDog.png");
}

function setup() {
  createCanvas(500, 500);
  readState = database.ref("gameState");
  readState.on("value",function(data){
    gameState = data.val
  })
   foodObj = createSprite();
feed = createButton("Feed the Dog");
feed.position(700,39);
feed.mousepressed(feedDog);

addFood = createButton("addFood");
addFood.position(800,95)
addFood.mousepressed(addFoods);

  Dog = createSprite(200,300,120,40);
  Dog.addImage(DogIMG);
    Dog.scale = 0.2

 database = firebase.database();
FoodStock = database.ref('Food');
FoodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);
  
textSize(20);
fill('black')
   text('score:'+score,270,300)

fill('black');
textSize(25);
text('Press UP_ARROW KEY to fill the Drago Milk!',50,30);

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("lastFed:,"+ lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
text("lastFed:12 AM",350,30);
  }
  else{
    text("lastFed:"+lastFed +"AM",350,300);
  }
  if(gameState!="Hungry"){
    Feed.hide();
    addFood.hide();
    Dog.remove();
  }else{
    Feed.show();
    addFood.show();
    Dog.addImage("deadIMG");
  }
  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update('Playing');
    FoodObj.garden();
  }else if(currentTime==lastFed+2){
    update('Sleeping')
    FoodObj.bedroom();
  }else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
    update('Bathing');
    FoodObj.washroom()
  }else{
    update('Hungry')
FoodObj.display();
  }
  

  drawSprites();
}
  //add styles here
   



function readStock(data){
FoodS = data.val()
}
function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x - 1
  }
  database.ref('/').update({
    food:x
  })
}
function feedDog(){
  Dog.addImage(happydog);
  FoodObj.updateFoodStock(FoodObj.getFoodStock()-1)
  database.ref('/').update
  food:FoodObj.getFoodStock();
  fedTime:hour();
}
function addFoods(){
  FoodS++
  database.ref('/').update({
    food:FoodS
  })
}
function update(State){
database.ref('/').update({
  gameState:State
})
}


