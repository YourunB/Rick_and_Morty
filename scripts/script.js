    let maxPage = 42;
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
    });

    document.getElementsByTagName("img")[4].addEventListener("mouseover", () => {
      document.getElementsByTagName("img")[4].src = "assets/img/face2.png"
      audioCheck();
    });

    document.getElementsByTagName("img")[4].addEventListener("mouseout", () => {
      document.getElementsByTagName("img")[4].src = "assets/img/face1.png"
      audioCheck();
    });

    document.getElementsByTagName("img")[4].addEventListener("click", () => {
      document.getElementsByTagName("img")[4].src = "assets/img/face3.png";
      audioCheck();
      btnMusic.classList.remove("unvisible");
      document.getElementById('promo').play();

      setTimeout(() => {
        document.getElementsByClassName("face")[0].classList.add("unvisible");
        document.getElementsByClassName("dance")[0].classList.remove("unvisible");
        document.getElementsByClassName("rick")[0].classList.remove("unvisible");
        document.getElementsByClassName("morty")[0].classList.remove("unvisible");
      }, 1000);

      let intervalChangeRickMortyId1 = setInterval(() => {
        document.getElementsByClassName("rick")[0].src = "assets/img/rick2.png";
        document.getElementsByClassName("morty")[0].src = "assets/img/morty2.png";
      }, 1000); 

      let intervalChangeRickMortyId2 = setInterval(() => {
        document.getElementsByClassName("rick")[0].src = "assets/img/rick.png";
        document.getElementsByClassName("morty")[0].src = "assets/img/morty.png";
      }, 2000); 

      setTimeout(()=> {
        document.getElementsByClassName("dance")[0].classList.add("unvisible");
        changeLoad.classList.remove("unvisible")

        let btn20 = document.getElementById("btn20");
        let btnAll = document.getElementById("btnAll");
        
        btn20.addEventListener("mouseover", () => { document.getElementById('changeMenu').play(); });
        btnAll.addEventListener("mouseover", () => { document.getElementById('changeMenu').play(); });

        btn20.addEventListener("click", () => {
          clearInterval(intervalChangeRickMortyId1);
          clearInterval(intervalChangeRickMortyId2);
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
          clearInterval(intervalChangeRickMortyId1);
          clearInterval(intervalChangeRickMortyId2);
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
