//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock; 



function preload()
{
  //load images here
  dogIMG  = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,300,10,10);
  dog.addImage(dogIMG);
  dog.scale = 0.2
  foodStock =  database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
 background(46,139,87);

 if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   dog.addImage(happyDog);
 }
 
  drawSprites();
  //add styles here
fill("white");
text("foodRemaining"+foodS,170,200);
textSize(13);
text("Press UP Arrow Key To Feed the Dog",130,10,300,20);


}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
else{
  x=x-1;
}

database.ref('/').update({
  Food:x
})
}
