//Create variables here
var database
var dog, happyDog
var dogSprite
var foodS
var foodStock

function preload()
{
  
	dog=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dogSprite = createSprite(250, 250 ,100 ,100)
  dogSprite.addImage(dog)
  dogSprite.scale = 0.3
  foodStock = database.ref('Food')
  foodStock.on("value", readStock);
  
}


function draw() {  
background(46, 139, 87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS)
  dogSprite.addImage(happyDog);
}
  drawSprites();

  fill(255)
  textSize(15);
  text("Press Up Arrow to feed Milk", 150, 100);

  fill(255);
  textSize(15);
  textFont("Times New Roman");
  text("Food Left : " +foodS +" 🥛", 100, 120)
 
 

}

function readStock(data){
  foodS = data.val();
}


function writeStock(x){
  if (x <= 0) {
    x = 0;
    
    dogSprite.addImage(dog);
  }
  else {
    x = x - 1;
  }

  database.ref("/").update({
    Food : x
  })

}




