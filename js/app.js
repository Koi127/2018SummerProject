function initialize(){
  $("#restart").hide();
  Crafty.sprite("https://i.imgur.com/vCtCn9m.png", {Character:[0,0,50,50]});
  Crafty.sprite("https://i.imgur.com/vVeZbHk.png", {Enemy:[0,0,10,50]});
  Crafty.sprite("https://i.imgur.com/lwEO5E2.png", {Platform:[0,0,50,10]});
  var screenheight = 1000;
  var screenwidth = 1000;
  var destroyGround = false;
  var delayEnemy = null;
  var delayPlatform = null;
  function drawCharacter(xPos, yPos){
    var character = Crafty.e('2D, Canvas, Shape, Color, Gravity, Keyboard, Twoway,GroundAttacher,Collision,Character');
    character.h = 50;
    character.w = 50;
    character.y = yPos;
    character.x = xPos;
    // character.color(characterCol)
    character.gravity('floor');
    character.twoway(150);
    character.checkHits('enemy');
    character.bind("HitOn", function(hitData){
        if(character.y+character.h>hitData[0].obj.y){
        character.destroy();
        Crafty.enterScene('scene2');
      }
    })
    character.bind('EnterFrame',function(){
        if(character.y<500){
          return destroyGround = true;
        }
        if(character.y>700){
          character.destroy();
          Crafty.enterScene('scene2');
        }
        if(character.x>1000){
          character.x=0;
        }
        else if(character.x<0){
          character.x=1000;
        }
    })
  }

  function drawPlatform(){
    var platform=Crafty.e('floor, 2D, Canvas, Color,Platform');
    platform.h =10 ;
    platform.w =50 ;
    platform.x =(Math.random() * 950 )+10 ;
    platform.y =0 ;
    platform.color('#E7B140');
    platform.bind("EnterFrame", function(){
      platform.y++;
      if(platform.y>700){
          platform.destroy();
      }
    })
  }

function drawEnemy(){
  var enemy = Crafty.e('2D, Canvas, Color,enemy,Enemy');
  enemy.w = 10;
  enemy.h = 50;
  enemy.x = (Math.random() * 990 )+10;
  enemy.y = 0;
  enemy.bind("EnterFrame",function(){
    enemy.y+=5;
    if(enemy.y>700){
        enemy.destroy();
    }
  })
}

function randomEnemy(){
  delayEnemy = setInterval(function(){
    var setRandomEnemy= Math.floor(Math.random() * 4);
    for(var x=0; x<setRandomEnemy; x++){
      drawEnemy();
    }
    drawEnemy();

  }, 5000);
}

function delay(){
  delayPlatform = setInterval(function(){
    var randomPlatform= Math.floor(Math.random() * 4+1);
    for(var x=0; x<randomPlatform; x++){
      drawPlatform();
    }
    // drawPlatform();
  }, 1900);
}

  function drawGround(xPos,yPos){
    var ground = Crafty.e('floor, 2D, Canvas, Color');
    ground.h=20;
    ground.w=screenwidth;
    ground.x=xPos;
    ground.y=yPos;
    ground.color('brown');
    ground.bind("EnterFrame", function(){
      if(destroyGround === true){
        ground.destroy();
      }
    })
  }

  Crafty.defineScene('scene1',function(){
    function drawScene1(){
      var sceneOne = Crafty.e('2D, Canvas, Color');
      sceneOne.x=0;
      sceneOne.y=0;
      sceneOne.w=screenwidth;
      sceneOne.h=screenheight;
    }
    drawGround(0,690);
    delay();
    randomEnemy();
    drawCharacter(screenheight/2,screenwidth/2);
    $('#over').hide();
    $("#restart").hide();
  });

  Crafty.defineScene('scene2',function(){
    function drawScene2(){
      var sceneTwo = Crafty.e('2D, Canvas, Color');
      sceneTwo.x=0;
      sceneTwo.y=0;
      sceneTwo.w=screenwidth;
      sceneTwo.h=screenheight;
    }
    clearInterval(delayEnemy);
    clearInterval(delayPlatform);

    $('#over').text('Game Over');
    $('#over').show();
    $("#restart").show();
  });

  Crafty.init(screenwidth, screenheight);
  Crafty.enterScene('scene1');

}

$(document).ready(function(){
  initialize();
  $('#restart').click(function(){
    initialize();
  });
});
