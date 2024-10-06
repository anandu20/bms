const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
let picture;
let banner;
async function getMovie() {
    const res=await fetch(`http://localhost:3000/api/getmovie/${id}`);
    const movie=await res.json();
    
    picture=movie.picture;
    banner=movie.banner;
    document.getElementById("frm").innerHTML=`
    

              <div class="main">
            <div class="left">
            <label for="title">Movie Title:</label>
            <input type="text" id="title" name="title" value=${movie.title}>
            
            <label for="duration">Duration (in minutes):</label>
            <input type="number" id="duration" name="duration" value=${movie.duration}>

            <label for="genre">Genre:</label>
            <input type="text" id="genre" name="genre" value=${movie.genre}>

            <label for="release-date">Release Date:</label>
            <input type="date" id="releaseDate" name="releaseDate" value=${movie.releaseDate}>

            <label for="language">Language:</label>
            <input type="text" id="language" name="language" value=${movie.language}>

            <label for="format">Format:</label>
            <input type="text" id="format" name="format" value=${movie.format}>

            <label for="certification">Certification:</label>
            <select id="certification" name="certification" value=${movie.certification}>


            
                <option value="U">U</option>
                <option value="UA">UA</option>
                <option value="A">A</option>
                <option value="S">S</option>
            </select>
             </div>

             <div class="right">
                <label for="picture">Picture:</label>
                <input type="file" id="picture" name="picture" onchange="pic('picture')">
                <div class="pic1" >
                <img src="${picture}" alt="" id="picture1" >  
                    
                </div>
    
                <label for="banner">banner:</label>
                <input type="file" id="banner" name="picture" onchange="pic('banner')" >
                <div class="pic2" >
                   <img src="${banner}" alt="" id="picture2">
                </div>
            </div>
            </div> 

            <button type="submit" >Submit</button>
    `;
}
getMovie();

document.getElementById("frm").addEventListener("submit",async(e)=>{
    e.preventDefault();
    try {
        const title=document.getElementById("title").value;
    const duration=document.getElementById("duration").value;
    const genre=document.getElementById("genre").value;
    const releaseDate=document.getElementById("releaseDate").value;
    const language=document.getElementById("language").value;
    const format=document.getElementById("format").value;
    const certification=document.getElementById("certification").value;
    const res=await fetch(`http://localhost:3000/api/editmovie/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({title,duration,genre,releaseDate,language,format,certification,picture,banner})
    })
    if(res.status==201){
        alert("Updated")
        window.location.href="../index.html"
    }else{
        alert("error")
    }
    } catch (error) {
        console.log(error);
        
    }
})

async function pic(c){
    console.log(c);
    
    if(c=="picture"){ 
    console.log("hai");
    
    picture=await convertToBase64(document.getElementById("picture").files[0]);  //it is to convert image to string format
    document.getElementById("picture1").src=picture;   // here we edit the poster image
    // console.log(picture);

    }
    else{
        banner=await convertToBase64(document.getElementById("banner").files[0]);  //it is to convert image to string format
        document.getElementById("picture2").src=banner;
        // console.log(banner);
        
    }
    
}
//--this function he is used to convert  the image into string  for any images--

function convertToBase64(file) {
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);   
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror= (error)=>{
            reject(error)
        }
    })
}