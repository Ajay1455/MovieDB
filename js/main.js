let searchField = document.getElementById("searchField");

let content = document.getElementById("content");

if (!sessionStorage.getItem("movies")) {
  sessionStorage.setItem("movies", "[]");
}

function present(movieId){
    let favMovies=JSON.parse(sessionStorage.getItem("movies"));
    if(favMovies){

        for(let obj of favMovies){
            if(obj.id == movieId){
                return true;
            };
        };
    };
    return false;
};
.0
// handlefav == alerBox
function alertBox(text, color) {
  let alert = document.getElementById("alert");
  alert.style.display = "block";
  alert.style.backbroundColor = color;
  alert.innerText = text;

  setTimeout(() => {
    alert.style.display = "none";
  }, 750);
}

// handleFavMovie == createFav
function createFav(moviesobj, addfavbtn) {
  let arrayOfMovie = JSON.parse(sessionStorage.getItem("movies"));
  let check = false;

  for (let i in arrayOfMovie) {
    if (arrayOfMovie[i].id == moviesobj.id) {
      
      arrayOfMovie.splice(i, 1);
      console.log(arrayOfMovie);

      check = true;
      addfavbtn.innerHTML = "Add to My Favourites❤️";
      addfavbtn.style.backgroundColor = "green";
      alertBox("Removed from Favorites", "deeppink");
      break;
    }
  }

  if (!check) {
    arrayOfMovie.push({
      name: moviesobj.name,
      id: moviesobj.id,
      image: moviesobj.image,
    });

    addfavbtn.innerHTML = "Removed from My Favourites✖️";
    addfavbtn.style.backgroundColor = "deeppink";
    alertBox("Added to Favorites", "royalblue");
  }

  sessionStorage.setItem("movies", JSON.stringify(arrayOfMovie));
}



function movieContent(movies) {
  for (let obj of movies) {
    // creating movie item  and setting attributes
    let id = obj.show.id;
    let list=document.createElement("li");
    let rightbox = document.createElement("div");

    let img = document.createElement("img");
    img.src = obj.show.image.original;

    let h4 = document.createElement("h4");
    h4.innerHTML = obj.show.name;

    let detailBtn = document.createElement("a");
    detailBtn.className = "detail";
    detailBtn.innerHTML = "Details💪";
    detailBtn.href = `detail.html?id=${id}`;

    let addfavbtn = document.createElement("a");
    addfavbtn.className = "addtofav";


    if (present(id)) {
      addfavbtn.style.backgroundColor = " deeppink";
      addfavbtn.innerHTML = "Removed from My Favorites ✖️";
    } else {
      addfavbtn.style.backgroundColor = "green";
      addfavbtn.innerHTML = "Add to My Favourites❤️";
    }

    rightbox.appendChild(h4);
    rightbox.appendChild(detailBtn);
    rightbox.appendChild(addfavbtn);
    list.appendChild(img);
    list.appendChild(rightbox);
    content.appendChild(list);


    let moviesDetails = JSON.parse(sessionStorage.getItem("movieDetails"));
    console.log(obj)
    moviesDetails.push({
      name: obj.show.name,
      id: obj.show.id,
      image: obj.show.image.original,
      summary:obj.show.summary,
      rating:obj.show.rating.average,
      genres:obj.show.genres,
      language:obj.show.language,
      network:obj.show.network.name,
      country:obj.show.network.country.name,
      premiered:obj.show.premiered,
      ended:obj.show.ended,
      status:obj.show.status,
      official:obj.show.officialSite
    });

    sessionStorage.setItem("movieDetails", JSON.stringify(moviesDetails));

    addfavbtn.addEventListener("click", () => {
      createFav(
        {
          name: obj.show.name,
          id: id,
          image: obj.show.image.original,
        },
        addfavbtn
      );
    });
  };
};


function searchMovies() {
  let name = searchField.value;
  console.log(name);
  content.innerHTML = "";
  if (!name) {
    return;
  }

  sessionStorage.setItem("movieDetails", sessionStorage.getItem("movies"));
  fetch(`https://api.tvmaze.com/search/shows?q=:${name}`)
    .then((movieResult) => {
      movieResult
        .json()
        .then((pmovieResult) => {
          movieContent(pmovieResult);
          console.log(pmovieResult)
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

searchField.addEventListener("input", searchMovies);
