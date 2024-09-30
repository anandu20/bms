async function getMovies() {   //this function is to get the movies that stored in database
    const res=await fetch("http://localhost:3000/api/getmovies");
    const movies=await res.json();
    console.log(movies);
    str=``;
    movies.map((movie)=>{
        str+=`
        <div class="movie">
            <a href="./movie.html?id=${movie._id}">
            <div class="mimg">
                        <img src="${movie.picture}" alt="">
                    </div>
                    <h3>${movie.title}</h3>
                    <p>${movie.certification}</p>
                    <p>${movie.language}</p>
            </a>
                    
        </div>
        `
    });
    document.getElementById("movies").innerHTML=str;
}
getMovies(); //call the function to get it

document.getElementById("filter").addEventListener('keyup',async(e)=>{   
//by using filter first fetch the data and using title we can filter 
    try {
        const res=await fetch("http://localhost:3000/api/getmovies");
        const movie=await res.json();
        console.log(movie);
        str=``;
        movie.filter((i)=>i.title.toLowerCase().includes(e.target.value.toLowerCase())).map((movie)=>{

            str+=`
            <div class="movie">
                <a href="./movie.html?id=${movie._id}">
                <div class="mimg">
                            <img src="${movie.picture}" alt="">
                        </div>
                        <h3>${movie.title}</h3>
                     
                </a>
                        
            </div>
            `
        })

        document.getElementById("movies").innerHTML=str;

    } catch (error) {
        console.log(error);
        
        
    }
});
  