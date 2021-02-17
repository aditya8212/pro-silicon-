const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var canvas;
var gameState = "start";
var john,laser;
var score;

function preload(){
	johnimg = loadImage("images/john.png");
	coinsimg = loadImage("images/jet_coins.png");
	firstback = loadImage("images/jetpackback1.jpg");
	zapperimg = loadImage("images/NewZapper.png");
	missile = loadImage("images/mis.png");
	ground = loadImage("images/jet gru.jpg");
	back = loadImage("images/grun.png");
	play = loadImage("images/play.png");
	johnZ = loadImage("images/johnzapp.png");
	johnFall = loadImage("images/johnfall.png")
	laserimg = loadImage("images/laser1.jpg");
	storyi = loadImage("images/storyimage.png");
	backtext = loadImage("images/backimage.png");
	explosionI = loadAnimation("images/explosion.jpg");
	storyback = loadImage("images/backimg (story).jpg");
	losti = loadImage("images/abab.png");
	resetBi = loadImage("images/resetb.png");

}

function setup(){
 
	canvas = createCanvas(1200,700);

	engine = Engine.create();
    world = engine.world;

	missileG = new Group();
	bulletsG = new Group();
	zapperG = new Group();
	coinsG = new Group();

	if(frameCount%50 === 0){
		laser = new LASER(random(100,600));
	
		}

	backi = createSprite(1200,430);
	backi.addImage(back);
	backi.velocityX = -5;
	backi.scale = 2.2;
	
	gru = createSprite(1200, 660, 2400, 50);
	gru.addImage(ground); 
	gru.scale = 1.55;
	gru.velocityX = -5;

	gruinvinsible = createSprite(600,600,1200,5);
	gruinvinsible.visible = false;

	gruinvinsible2 = createSprite(600,30,1200,10);
	gruinvinsible2.visible = false;

	john = createSprite(100,500,10,10);
	john.addImage(johnimg);
	john.scale = 0.15;

	playbutton = createSprite(570,490,10,10);
	playbutton.addImage(play);
	playbutton.scale = 0.5;

	storybutton = createSprite(570,550,40,20);
	storybutton.addImage(storyi);
	storybutton.scale = 0.3;

	backbutton = createSprite(990,550,40,20);
	backbutton.addImage(backtext);
	backbutton.scale = 0.3;

	resetbutton = createSprite(990,500,40,20);
	resetbutton.addImage(resetBi);
	resetbutton.scale = 0.2;
}

function draw() {
  
	background("black");

	Engine.update(engine);

if(gameState === "start"){
	
	background(firstback);

	john.visible = false;
	gru.visible = false;
	backi.visible = false;
	storybutton.visible = true;
	playbutton.visible = true;
	backbutton.visible = false;
	resetbutton.visible = false;

	drawSprites();

	if(mousePressedOver(playbutton)){
		gameState = "play";

	}

	if(mousePressedOver(storybutton)){
		gameState = "story";
	
	}
	
}

if(gameState === "play"){
	
	background("black");

	gru.visible = true;
	john.visible = true;
	playbutton.visible = false;
	backi.visible = true;
	storybutton.visible = false;
	backbutton.visible = false;
	resetbutton.visible = false;

	if(keyDown("space")){
		john.velocityY = -10;
		bullets();

	}

	john.velocityY = john.velocityY+1;

	john.collide(gruinvinsible);

	spawnMissile();
	zapper();
	coinsF();
	//laserF();
	collision();

	

	if(john.isTouching(zapperG)){
		gameState = "burnt"

	}

	if(john.isTouching(missileG)){
		gameState = "exploded"

	}

	if(gru.x < 0){
		gru.x = 1200;
	
	}

	if(backi.x < 0){
		backi.x = 1200;
	
	}

	john.collide(gruinvinsible2);



	drawSprites();

	laser.display();

}

if(gameState === "story"){
	john.visible = false;
	gru.visible = false;
	backi.visible = false;
	playbutton.visible = false;
	storybutton.visible = false;
	backbutton.visible = true;
	resetbutton.visible = false;

	background(storyback);

	textSize(20);
	fill("red");
	text("STORY",550,50);

	textSize(20);
	fill("maroon");
	text("OBJECTIVE",530,250);
	
	textSize(15);
	fill(" black");
	text("The objective of the game is to travel as far as possible, collect coins, and avoid hazards such as zappers, missiles and high-intensity laser beams.",50,300);
	
	textSize(15);
	fill(" black");
	text("John works as a salesman for a gramophone-making company, but the business is about to go bankrupt due to low sales. One day, as he walks down a street,",50,100);

	textSize(15);
	fill(" black");
	text("sad because of the low sales, he finds one of the top secret laboratories of Legitimate Research, and sees the Machinegun jetpack inside. Dreaming of using the jetpack to ",50,120);

	textSize(15);
	fill(" black");
	text("do good, John bursts through the wall of the laboratory and steals the experimental jetpack from the clutches of the scientists, thus beginning the game.",50,140);

	textSize(20);
	fill("red");
	text("CONTROLS",530,420);

	textSize(15);
	fill(" black");
	text("controls: spacebar ",520,460);

	if(mousePressedOver(backbutton)){
		gameState = "start"

	}

	drawSprites();
  
}


	if(gameState === "burnt"){

		background(losti);

		john.visible = true
		gru.visible = true;
		backi.visible = false;
		playbutton.visible = false;
		storybutton.visible = false;
		backbutton.visible = false;
		resetbutton.visible = true;
		
		john.addImage(johnZ);

		gru.velocityX = 0;
		john.velocityY = 3;

		zapperG.destroyEach();

		coinsG.destroyEach();

		missileG.destroyEach();

		john.collide(gruinvinsible);

		if(mousePressedOver(resetbutton)){
			gameState = "play";
			john.addImage(johnimg);
			gru.velocityX = -5;

		}

		drawSprites();
		
	}

	if(gameState === "exploded"){

		background(losti);

		john.visible = true
		gru.visible = true;
		backi.visible = false;
		playbutton.visible = false;
		storybutton.visible = false;
		backbutton.visible = false;
		resetbutton.visible = true;

		john.addAnimation("blog",explosionI);

		gru.velocityX = 0;
		john.velocityY = 3;

		zapperG.destroyEach();

		coinsG.destroyEach();

		missileG.destroyEach();

		john.collide(gruinvinsible);

		if(mousePressedOver(resetbutton)){
			gameState = "play";
			john.addImage(johnimg);
			gru.velocityX = -5;

		}

		drawSprites();
	}

}

function spawnMissile(){
	if(frameCount%200 === 0){
		miss = createSprite(1200,600);
		miss.addImage(missile);
		miss.velocityX = -10;
		miss.scale = 0.3;

		if(john.y < 550){
			miss.y = random(john.y-50,john.y+50);

		}
		else{
			miss.y = john.y-70;

		}

		miss.lifetime = 120;

		missileG.add(miss);

	}

}

function bullets(){
	if(frameCount%3 === 0){
		bul = createSprite(john.x,john.y+10,8,15);
		bul.velocityY = +20;
		bul.shapeColor = "yellow";
		bulletsG.add(bul);
		
		bul2 = createSprite(john.x-10,john.y+10,8,15);
		bul2.velocityY = +20;
		bul2.velocityX = -3;
		bul2.shapeColor = "yellow";
		bulletsG.add(bul2);

		bul3 = createSprite(john.x+10,john.y+10,8,15);
		bul3.velocityY = +20;
		bul3.velocityX = +3;
		bul3.shapeColor = "yellow";
		bulletsG.add(bul3);

	}

}

function zapper(){
	if(frameCount%100 === 0){
		zapp = createSprite(1200,600);
		zapp.addImage(zapperimg);
		zapp.rotationSpeed = 10;
		zapp.velocityX = -10;
		zapp.scale = 0.4;
		zapperG.add(zapp);

		if(john.y < 550){
			zapp.y = random(john.y-100,john.y+100);

		}
		else{
			zapp.y = john.y-170;

		}

		console.log(john.y);

	}

}

function coinsF(){
	if(frameCount%310 === 0){
		//letter c

		var y = random(100,500);

		for(var j=0;j<=8;j++){
			coins = createSprite(1200,y+20*j,10,10);
			coins.addImage(coinsimg);
			
			coinsG.add(coins);

		  }
		  
		  for(var i = 0;i<=5;i++){
			for(var j=0;j<2;j++){
			  coins = createSprite(1200+i*20,y+160*j,10,10);
			  coins.addImage(coinsimg);
			 
			  coinsG.add(coins)

			}
		  }

		  //letter o
		for(var i = 0;i<2;i++){
			for(var j=0;j<=8;j++){
				coins = createSprite(1340+100*i,y+20*j,10,10);
				coins.addImage(coinsimg);
				
				coinsG.add(coins);
			}
		}
	
		for(var i = 0;i<=5;i++){
			for(var j=0;j<2;j++){
				coins = createSprite(1340+i*20,y+160*j,10,10);
				coins.addImage(coinsimg);
				
				coinsG.add(coins)
			}
		}

		//letter i 
		for(var j=0;j<=8;j++){
			coins = createSprite(1475,y+20*j,10,10);
			coins.addImage(coinsimg);
			
			coinsG.add(coins);
		  }

		   //letter n
  		for(var i = 0;i<2;i++){
    		for(var j=0;j<=8;j++){
      			coins = createSprite(1510+100*i,y+20*j,10,10);
				coins.addImage(coinsimg);
				
      			coinsG.add(coins);
    		}
  		}

		  for(var i = 1; i <= 7; i++) {
			for(var j = 1; j <= i; j++) { 
			  if(j == i){
				coins = createSprite(1520+10*i,y+20*j,10,10);
				coins.addImage(coinsimg);
				
				coinsG.add(coins);
			  }
			}
		  }

		  coinsG.setVelocityXEach(-5); 
		  coinsG.setScaleEach(0.2);
	  
	}

}

function collision() {
	if(this.laser.y-john.y < this.laser.height/2+john.height/2 &&
	  john.y-this.laser.y < this.laser.height/2+john.height/2 ){
		  john.collide(this.laser);
   
	}
   
	if(this.laser.x-john.x < this.laser.width/2+john.width/2 &&
	 john.x-this.laser.x < this.laser.width/2+john.width/2 ){
		john.collide(this.laser);

   }
   
   }