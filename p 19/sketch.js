var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
feedFood=createButton("feed Food")
  feedFood.position=(600,95)
  feedFood.mousePressed(feedDog)
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  database.ref("foodTime").on("value",function(data){
  lastFed=data.val()  
  })
 
  //write code to display text lastFed time here
if(lastFed>=12){
text("lastFed time is: "+lastFed+"P.M",500,200)  
}
else if(lastFed===0){
  text("lastFed time is: 12 A.M",500,200)
}
else if(lastFed<12){
 text("lastFed time is: "+lastFed+"A.M",500,200)  
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(x){
  dog.addImage(happyDog);
  hour=hour()
  
  //write code here to update food stock and last fed time
  if(x<=0){
  x=0  
  }
  else{
  x=x-1  

  }
  database.ref("/").update({
  food:x,
  foodTime:hour 
  })




}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
