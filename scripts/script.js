let maxPage = 0;
let page = 1;
let wrapper = document.getElementById("wrapper");
let character = document.getElementById("character");
let characterImg = document.getElementById("characterImg");
let name = document.getElementById("name");
let status = document.getElementById("status");
let species = document.getElementById("species");
let origin = document.getElementById("origin");
let locat = document.getElementById("locat");
let gender = document.getElementById("gender");
let episode = document.getElementById("episode");
let goUp = document.getElementById("goUp");
let goUpImg = document.getElementById("goUpImg");
let changeLoad = document.getElementById("changeLoad");
let btnMusic = document.getElementById("btnMusic");
let eye = document.getElementsByClassName("eye")[0];
let checkResult = 1;
let request = new XMLHttpRequest();

let anim = {
  delay: 100,
  distance: '200px',
  duration: 500,
  easing: 'ease-in-out',
  rotate: { z: 10 }, 
  scale: 0.8, 
  mobile: true,
  reset: true,
};


function checkPages() {
  request.onerror = () => errorConnection();
  request.open('GET', 'https://rickandmortyapi.com/api/character', true);
  request.onload = function () {
    let data = JSON.parse(this.response);
    maxPage = data.info.pages;
  }
  request.send();
}


function errorConnection() {
  document.getElementsByClassName("blocked")[0].classList.remove("unvisible");
  document.getElementById("music").pause();
  wrapper.classList.add("unvisible");
  
  let failSong = document.getElementById("failSong");
  let disconectSong = document.getElementById("disconectSong");
  let boomSong = document.getElementById("boomSong");
  let rick = document.getElementById("rickAinim");

  failSong.play();
  setTimeout(() => { disconectSong.play(); }, 1200);

  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  let blockWidth = 768;
  let blockHeight = 768;
  let posX = 50;
  let posY = 20;
  let speedX = 2;
  let speedY = 2;
  let width = 250;
  let height = 250;
  let rotate = 0;

  if (document.body.getBoundingClientRect().width <= 800) {
    blockWidth = 310;
    blockHeight = 310;
    width = 90;
    height = 90;
    speedX = 1;
    speedY = 1;
  }

  let intervalId = setInterval(move, 30);

  window.addEventListener("resize", throttle( () => {
    clearInterval(intervalId);
    posX = 50;
    posY = 20;
    intervalId = setInterval(move, 30);
  }, 250)); 

  function move() {
    let requestID = requestAnimationFrame(move);
    
    posX -= speedX;
    rotate = rotate + 1;
    if (posX + width > blockWidth) {
      speedX = -speedX;
      posX = blockWidth - width;
      boomSong.play();
      document.getElementsByClassName("blocked")[0].style.background = getRandomColor();
    }
    if (posX < 0) {
      speedX = -speedX;
      posX = 0;
      boomSong.play();
      document.getElementsByClassName("blocked")[0].style.background = getRandomColor();
    }
    posY += speedY;
    if (posY + height > blockHeight) {
      speedY = -speedY;
      posY = blockHeight - height;
      boomSong.play();
      document.getElementsByClassName("blocked")[0].style.background = getRandomColor();
    }
    if (posY < 0) {
      speedY = -speedY;
      posY = 0;
      boomSong.play();
      document.getElementsByClassName("blocked")[0].style.background = getRandomColor();
    }

    rick.style.left = posX + "px";
    rick.style.top = posY + "px";
    rick.style.rotate = rotate + "deg";
    cancelAnimationFrame(requestID);
  }
}


eye.addEventListener("click", ()=>{
  eye.classList.add("unvisible");
  loading();
  let intervalId = setInterval( () => {
    if (checkResult === 1) add();
    if (page > maxPage) clearInterval(intervalId);
  },100);
});

let logo = document.getElementsByClassName("logo")[0];
logo.addEventListener("click", () => {
  logo.classList.add("unvisible");
  document.getElementById('tsss').play();
  document.getElementsByClassName("face")[0].classList.remove("unvisible");
  checkPages();
});

document.getElementsByTagName("img")[5].addEventListener("mouseover", () => {
  document.getElementsByTagName("img")[5].src = "assets/img/face2.png"
  audioCheck();
});

document.getElementsByTagName("img")[5].addEventListener("mouseout", () => {
  document.getElementsByTagName("img")[5].src = "assets/img/face1.png"
  audioCheck();
});

document.getElementsByTagName("img")[5].addEventListener("click", () => {
  document.getElementsByTagName("img")[5].src = "assets/img/face3.png";
  audioCheck();
  btnMusic.classList.remove("unvisible");
  document.getElementById('promo').play();

  setTimeout(() => {
    document.getElementsByClassName("face")[0].classList.add("unvisible");
    document.getElementsByClassName("dance")[0].classList.remove("unvisible");
    document.getElementsByClassName("rick")[0].classList.remove("unvisible");
    document.getElementsByClassName("morty")[0].classList.remove("unvisible");
  }, 1000);

  setTimeout(()=> {
    document.getElementsByClassName("dance")[0].classList.add("unvisible");
    changeLoad.classList.remove("unvisible")

    let btn20 = document.getElementById("btn20");
    let btnAll = document.getElementById("btnAll");
    
    btn20.addEventListener("mouseover", () => { document.getElementById('changeMenu').play(); });
    btnAll.addEventListener("mouseover", () => { document.getElementById('changeMenu').play(); });

    btn20.addEventListener("click", () => {
      changeLoad.classList.add("unvisible")
      wrapper.classList.remove("unvisible");
      document.getElementById('music').play();
      document.body.classList.add("back-img");
      document.getElementsByClassName("rick")[0].classList.add("unvisible");
      document.getElementsByClassName("morty")[0].classList.add("unvisible");
      eye.classList.remove("unvisible");
      scroll();
      add();
    });

    btnAll.addEventListener("click", () => {
      changeLoad.classList.add("unvisible")
      wrapper.classList.remove("unvisible");
      document.getElementById('music').play();
      document.body.classList.add("back-img");
      document.getElementsByClassName("rick")[0].classList.add("unvisible");
      document.getElementsByClassName("morty")[0].classList.add("unvisible");
      loading();
      let intervalId = setInterval( () => {
        if (checkResult === 1) add();
        if (page > maxPage) clearInterval(intervalId);
      },100);
      scroll();
    });

  }, 15000);
});


function loading() {
  document.body.classList.add("wait");
  document.getElementsByClassName("load")[0].classList.remove("unvisible");
}


function add() {
  checkResult = 0;
  if (page <= maxPage) {
    create(page);
    page = page + 1;
    if (page > maxPage) {
      setTimeout(()=>{ 
        document.body.classList.remove("wait");
        document.getElementsByClassName("load")[0].classList.add("unvisible");
      }, 2000);

      let cards = wrapper.getElementsByClassName("card");
      for (let i = 0; i < cards.length; i++) { 
        cards[i].classList.remove("animation");
        cards[i].classList.add("reveal"); 
      }
      window.sr = ScrollReveal().reveal( '.reveal', anim );
    }

  } else return;
}


function create(page) {
  request.onerror = () => {
    errorConnection();
    
  }
  request.open('GET', 'https://rickandmortyapi.com/api/character/?page=' + page, true);
  
  request.onload = function () {
    let data = JSON.parse(this.response);

    for (let i = 0; i < data.results.length; i++) {
      wrapper.append(document.createElement("div"));
      wrapper.getElementsByTagName("div")[wrapper.getElementsByTagName("div").length - 1].id = "id" + data.results[i].id;
      wrapper.getElementsByTagName("div")[wrapper.getElementsByTagName("div").length - 1].classList = "card";
      wrapper.getElementsByTagName("div")[wrapper.getElementsByTagName("div").length - 1].classList.add("animation");

      wrapper.getElementsByTagName("div")[wrapper.getElementsByTagName("div").length - 1].append(document.createElement("img"));
      wrapper.getElementsByTagName("img")[wrapper.getElementsByTagName("img").length - 1].src = data.results[i].image;
      wrapper.getElementsByTagName("img")[wrapper.getElementsByTagName("img").length - 1].alt = "character image";

      wrapper.getElementsByTagName("div")[wrapper.getElementsByTagName("div").length - 1].append(document.createElement("h3"));
      wrapper.getElementsByTagName("h3")[wrapper.getElementsByTagName("h3").length - 1].textContent = data.results[i].name;

      //console.log(data.results[i].id);
    }
    checkResult = 1;
  }
  request.send();
}


function showCharacter(id, posY, posX, elWidth) {
  request.onerror = () => errorConnection();
  request.open('GET', 'https://rickandmortyapi.com/api/character/' + id, true);
  
  request.onload = function () {
    let data = JSON.parse(this.response);
    name.textContent = data.name;
    status.textContent = data.status;
    species.textContent = data.species;
    episode.textContent = data.episode[0].split('episode/')[1];
    origin.textContent = data.origin.name;
    locat.textContent = data.location.name;
    gender.textContent = data.gender;
    characterImg.src = data.image;

    character.style.top = posY + pageYOffset + "px";
    if (document.body.clientWidth > 1500) character.style.left = posX - (elWidth / 2) + "px";
    else character.style.left = "auto";

    character.classList.remove("unvisible");
    //console.log("Позиция эл-та: " + posY);
    //console.log("Выстоа экрана: " + window.screen.height);
    if (posY <= 0 || posY >= window.screen.height - 300) setTimeout(() => goTo(), 1000);
  }
  request.send();
}


function throttle(callee, timeout) {
  let timer = null

  return function perform(...args) {
    if (timer) return

    timer = setTimeout(() => {
      callee(...args)

      clearTimeout(timer)
      timer = null
    }, timeout)
  }
}


function scroll() {
  window.addEventListener("scroll", throttle( () => {
    if (window.scrollY > 200) {
      goUp.classList.remove("unvisible");
    } else {
      goUp.classList.add("unvisible");
    }

    let pageSize = document.body.getBoundingClientRect().height;
    let displaySize = window.screen.height;
    let scrollPosition = window.scrollY;

    if (scrollPosition + displaySize > pageSize - 20) add(); 
  }, 250)); 
}


wrapper.onclick= () => {
  audioCheck();
  for (let i = 0; i <= document.getElementsByClassName("card").length; i++) {
    if (event.target.closest("div").id == "id" + i) {
      let idCharacter = document.getElementsByClassName("card")[i-1];
      showCharacter(idCharacter.id.slice(2, idCharacter.id.length), idCharacter.getBoundingClientRect().top, idCharacter.getBoundingClientRect().left, idCharacter.getBoundingClientRect().width);
    }
  }
}

let count = 1;
btnMusic.addEventListener("click", () => {
  count = -count;
  if (count < 0) {
    document.getElementById("music").volume = 0;
    document.getElementById("promo").volume = 0;
    btnMusic.src = "assets/svg/music-off.svg"
  } else {
    document.getElementById("music").volume = 1;
    document.getElementById("promo").volume = 1;
    btnMusic.src = "assets/svg/music-on.svg"
  }
});

function audioCheck() { document.getElementById('check').play(); }

goUp.addEventListener("mouseover", () => {
  goUpImg.src= "assets/img/scroll_top2.png";
  audioCheck() 
});

goUp.addEventListener("mouseout", () => {
  goUpImg.src= "assets/img/scroll_top1.png";
  audioCheck() 
});

goUp.addEventListener("click", () => { document.getElementById('up').play(); });


function goTo() {
  location.href = "#character";
}

character.addEventListener("click",() => {
  character.classList.add("unvisible");
});

window.addEventListener("resize", function(event) {
  character.classList.add("unvisible");
});
