function alertBox(text, color) {
  let alert = document.getElementById("alert");
  alert.style.display = "block";
  alert.style.backbroundColor = color;
  alert.innerText = text;

  setTimeout(() => {
    alert.style.display = "none";
  }, 750);
}

let arrayOfmovies = JSON.parse(sessionStorage.getItem("movies"));
let favbox = document.getElementById("favbox");

function displayFavMovies() {

  for (let obj of arrayOfmovies) {
    let card = document.createElement("div");
    card.classList.add("card");

    // let imageContainer = document.createElement("div");
    let img = document.createElement("img");
    img.src = obj.image;
    // imageContainer.appendChild(img)

    let p = document.createElement("p");
    p.innerHTML = obj.name;

    let favbtn = document.createElement("a");
    favbtn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:red"></i>`;
    favbtn.classList.add("heart");

    let detailbtn = document.createElement("a");
    detailbtn.classList.add("favdetails");
    detailbtn.innerHTML = "Details";
    detailbtn.href = `detail.html?id=${obj.id}`;

    // card.appendChild(imageContainer);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(favbtn);
    card.appendChild(detailbtn);
    favbox.appendChild(card);

    favbtn.addEventListener("click", ()=>{
        for(let i in arrayOfmovies){
            
            if(arrayOfmovies[i].id == obj.id){
                arrayOfmovies.splice(i, 1);
                alertBox("Removed from Favorites", "deeppink");
                sessionStorage.setItem("movies", JSON.stringify(arrayOfmovies));
                break;
            };
        };
        card.remove();
    });
  };
};
displayFavMovies();
