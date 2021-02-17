class LASER{
    constructor(y){
        var options={
            isStatic:true
        }

      this.body = Bodies.rectangle(450,y,1200,30,options);
      this.width = 1200;
      this.height = 30;
      World.add(world,this.body);
      this.image = loadImage("images/laser1.jpg");
      this.Visiblity = 255;

    }
  
   display(){

       push();
       imageMode(CENTER);
       this.Visiblity = this.Visiblity - 3;
       tint(255,this.Visiblity);
       image(this.image, this.body.position.x, this.body.position.y, this.width, this.height);
       pop();
  
   }
  
  };