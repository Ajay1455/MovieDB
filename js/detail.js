function alertBox(text, color) {
  let alert = document.getElementById("alert");
  alert.style.display = "block";
  alert.style.backbroundColor = color;
  alert.innerText = text;

  setTimeout(() => {
    alert.style.display = "none";
  }, 750);
}

function present(movieId) {
  let favMovies = JSON.parse(sessionStorage.getItem("movies"));
  if (favMovies) {
    for (let obj of favMovies) {
      if (obj.id == movieId) {
        return true;
      }
    }
  }
  return false;
}

/*The URLSearchParams interface defines utility methods
 to work with the query string of a URL.
 URLSearchParams helps to working with query url
 this API provide a way to get the data in the URL query
 parameters.*/

const params = new URLSearchParams(window.location.search);
let movieId = params.get("id");
let detailbox = document.getElementById("detailbox");


function favWorking(moviesObj, favbtn) {
  let arrayOfFav = JSON.parse(sessionStorage.getItem("movies"));

  if (present(moviesObj.id)) {
    favbtn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:white"></i>`;
    
    for (let i in arrayOfFav) {
      if (arrayOfFav[i].id == moviesObj.id) {
        arrayOfFav.splice(i, 1);
        alertBox("Removed from Favorites", "deeppink");
        break;
      }
    }
  } else {
    arrayOfFav.push(moviesObj);
    favbtn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:red"></i>`;
    alertBox("Added to Favorites", "royalblue");
  }

  sessionStorage.setItem("movies", JSON.stringify(arrayOfFav));
}


let movies = JSON.parse(sessionStorage.getItem("movieDetails"));
console.log(movies)
for (let obj of movies) {
  if (obj.id == movieId) {
    console.log(obj.genres)
    let movieImage = document.createElement("img");
    let movieName = document.createElement("h2");
    let movieDetail = document.createElement("p");
    let movieRating = document.createElement("h3");
    let movieGenres = document.createElement("h3");
    let movieLang = document.createElement("h3");
    let movieNetwork = document.createElement("h3");
    let movieContry = document.createElement("h3");
    let moviePremier = document.createElement("h3");
    let movieEnded = document.createElement("h3");
    let movieStatus = document.createElement("h3");
    let movieLink = document.createElement("a");
    document.getElementById("bckbox").style.background=`url(${obj.image})`


    let genre="";
    for (let li of obj.genres) {
      genre+=li+" ";
    }
  
    let favbtn = document.createElement("a");
    movieImage.src = obj.image;
    movieName.innerHTML = obj.name;
    movieDetail.innerHTML=obj.summary;
    movieRating.textContent = "Rating : " + (obj.rating? obj.rating : "5.0" );
    movieGenres.textContent="Genre : "+genre;
    movieLang.textContent="Language : "+obj.language;
    movieNetwork.textContent="Network : "+obj.network;
    movieContry.textContent="Country : "+obj.country;
    moviePremier.textContent="Premiered : "+obj.premiered;
    movieStatus.textContent="Status : "+obj.status;
    movieEnded.textContent="Ended on : "+obj.ended;
    movieLink.href=obj.official
    movieLink.innerHTML="Official Site"

    favbtn.classList.add("heart");

    if (present(obj.id)) {
      favbtn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:red"></i>`;
    } else {
      favbtn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:white"></i>`;
    }
    detailbox.appendChild(movieImage);
    detailbox.appendChild(movieName);
    detailbox.appendChild(movieDetail);
    detailbox.appendChild(movieRating);
    detailbox.appendChild(movieGenres);
    detailbox.appendChild(movieLang);
    detailbox.appendChild(movieNetwork);
    detailbox.appendChild(movieContry);
    detailbox.appendChild(moviePremier);
    detailbox.appendChild(movieStatus);
    detailbox.appendChild(movieEnded);
    detailbox.appendChild(movieLink);

    detailbox.appendChild(favbtn);
    favbtn.addEventListener("click", () => {
      favWorking(obj, favbtn);
    });
    break;
  }
}
