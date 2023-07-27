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

    document.getElementsByTagName("img")[0].addEventListener("mouseover", () => {
      document.getElementsByTagName("img")[0].src = "assets/img/face2.png"
      audioCheck();
    });

    document.getElementsByTagName("img")[0].addEventListener("mouseout", () => {
      document.getElementsByTagName("img")[0].src = "assets/img/face1.png"
      audioCheck();
    });

    document.getElementsByTagName("img")[0].addEventListener("click", () => {
      document.getElementsByTagName("img")[0].src = "assets/img/face3.png";
      audioCheck();
      btnMusic.classList.remove("unvisible");
      document.getElementById('promo').play();

      setTimeout(() => {
        document.getElementsByClassName("face")[0].classList.add("unvisible");
        document.getElementsByClassName("dance")[0].classList.remove("unvisible");
      }, 1000);

      setTimeout(()=>{
        document.getElementsByClassName("dance")[0].classList.add("unvisible");
        changeLoad.classList.remove("unvisible")

        let btn20 = document.getElementById("btn20");
        let btnAll = document.getElementById("btnAll");

        btn20.addEventListener("click", () => {
          changeLoad.classList.add("unvisible")
          wrapper.classList.remove("unvisible");
          document.getElementById('music').play();
          add();
        });

        btnAll.addEventListener("click", () => {
          changeLoad.classList.add("unvisible")
          wrapper.classList.remove("unvisible");
          document.getElementById('music').play();
          for (let i = 0; i <= maxPage; i++) { add(); }
        });

      }, 15000);
    });
    

    function add() {
      if (page < maxPage) {
        create(page);
        page = page + 1;
      } else return;
    }

 
    function create(page) {
      let request = new XMLHttpRequest();
      request.open('GET', 'https://rickandmortyapi.com/api/character/?page=' + page, true);

      request.onload = function () {
        let data = JSON.parse(this.response);

        for (let i = 0; i < data.results.length; i++) {
          wrapper.append(document.createElement("div"));
          document.getElementsByTagName("div")[document.getElementsByTagName("div").length - 1].id = "id" + data.results[i].id;
          document.getElementsByTagName("div")[document.getElementsByTagName("div").length - 1].classList = "card";

          document.getElementsByTagName("div")[document.getElementsByTagName("div").length - 1].append(document.createElement("img"));
          document.getElementsByTagName("img")[document.getElementsByTagName("img").length - 1].src = data.results[i].image;
          document.getElementsByTagName("img")[document.getElementsByTagName("img").length - 1].alt = "character image";

          document.getElementsByTagName("div")[document.getElementsByTagName("div").length - 1].append(document.createElement("h3"));
          document.getElementsByTagName("h3")[document.getElementsByTagName("h3").length - 1].textContent = data.results[i].name;
        }
      }
      request.send()
    }


    function showCharacter(id, posY, posX, elWidth) {
      let request = new XMLHttpRequest();
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
        setTimeout(() => goTo(), 1000);
      }
      request.send();
    }

    window.addEventListener("scroll",() => {
      if (window.scrollY > 200) {
        goUp.classList.remove("unvisible");
      } else {
        goUp.classList.add("unvisible");
      }

      let pageSize = document.body.clientHeight;
      let displaySize = window.screen.height;
      let scrollPosition = window.scrollY;

      if (scrollPosition + displaySize > pageSize - 20) add(); 
    });


    wrapper.onclick= () => {
      audioCheck();
      for (let i = 0; i <= document.getElementsByClassName("card").length; i++) {
        if (event.target.closest("div").id == "id" + i || event.target.id === "id" + i) {
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