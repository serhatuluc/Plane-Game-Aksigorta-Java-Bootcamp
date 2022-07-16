
var jet = document.getElementById("jet");
var board = document.getElementById("board");

window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  //Yön tuşlarının hassasiyeti arttırıldı//Serhat
  if (e.key == "ArrowLeft" && left > 0) {
    jet.style.left = left - 20 + "px";
  }
  //460  =>  board width - jet width
  else if (e.key == "ArrowRight" && left <= 460) {
    jet.style.left = left + 20 + "px";
  }

  if (e.key == "ArrowUp" || e.keyCode == 32) {
    //32 is for space key
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);

    //rocks diye adlandırılan engeller bir tane iken döngü kullanılarak arttırıldı.//Serhat
    var movebullet = setInterval(() => {
      var rocks1 = document.getElementsByClassName("rocks");
      var rocks2 = document.getElementsByClassName("rocks2");
      const list_rocks = [rocks1,rocks2]
      for(var i=0;i<list_rocks.length;i++){
        for (var j = 0; j < list_rocks[i].length; j++) {
            var rock = list_rocks[i][j];
            if (rock != undefined) {
              var rockbound = rock.getBoundingClientRect();
              var bulletbound = bullet.getBoundingClientRect();
    
              //Condition to check whether the rock/alien and the bullet are at the same position..!
              //If so,then we have to destroy that rock
                
              //Pixel eklenerek kurşunun isabet oranı arttırıldı
              if (
                bulletbound.left + 5 >= rockbound.left &&
                bulletbound.right  - 10<= rockbound.right &&
                bulletbound.top + 5<= rockbound.top &&
                bulletbound.bottom + 5 <= rockbound.bottom
              ) {
                rock.parentElement.removeChild(rock); //Just removing that particular rock;
                //Scoreboard
                document.getElementById("points").innerHTML =
                  parseInt(document.getElementById("points").innerHTML) + 1;
              }
            }
          }
      }
      var bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

      //Stops the bullet from moving outside the gamebox
      if (bulletbottom >= 500) {
        clearInterval(movebullet);
      }

      bullet.style.left = left + "px"; //bullet should always be placed at the top of my jet..!
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
});

//İkinci engelin de çerçeve boyunca random oluşturulması sağlandı./Serhat
var generaterocks = setInterval(() => {
  var rock = document.createElement("div");
  var rock2 = document.createElement("div");
  rock.classList.add("rocks");
  rock2.classList.add("rocks2")
  //Just getting the left of the rock to place it in random position...
  var rockleft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  //generate value between 0 to 450 where 450 => board width - rock width
  rock.style.left = Math.floor(Math.random() * 450) + "px";
  rock.style.left = Math.floor(Math.random() * 450) + "px";

  board.appendChild(rock);
  board.appendChild(rock2);
}, 3000);


//Cisimlerin hareket etmesi ve çerçeveden çıkınca oyunu bitirmesi sağlandı./Serhat
var moverocks = setInterval(() => {
  var rocks = document.getElementsByClassName("rocks");
  var rocks2 = document.getElementsByClassName("rocks2");

  if (rocks != undefined) {
    for (var i = 0; i < rocks.length; i++) {
      //Now I have to increase the top of each rock,so that the rocks can move downwards..
      var rock = rocks[i]; //getting each rock
      var rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
      //475 => boardheight - rockheight + 25
      if (rocktop >= 475) {
        alert("Game Over");
        clearInterval(moverocks);
        window.location.reload();
      }

      rock.style.top = rocktop + 25 + "px";
    }
  }

    if (rocks2 != undefined) {
      for (var i = 0; i < rocks2.length; i++) {
        //Now I have to increase the top of each rock,so that the rocks can move downwards..
        var rock2 = rocks2[i]; //getting each rock
        var rocktop2 = parseInt(
          window.getComputedStyle(rock2).getPropertyValue("top")
        );
        //475 => boardheight - rockheight + 25
        if (rocktop2 >= 475) {
          alert("Game Over");
          clearInterval(moverocks);
          window.location.reload();
        }
  
        rock2.style.top = rocktop2 + 25 + "px";
      }
    }
}, 450);

