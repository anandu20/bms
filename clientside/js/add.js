let picture
let banner
document.getElementById("frm").addEventListener("submit",async(e)=>{
    e.preventDefault();
    const title=document.getElementById("title").value;
    const duration=document.getElementById("duration").value;
    const genre=document.getElementById("genre").value;
    const releaseDate=document.getElementById("releaseDate").value;
    const language=document.getElementById("language").value;
    const format=document.getElementById("format").value;
    const certification=document.getElementById("certification").value;
    fetch("http://localhost:3000/api/addmovie",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({title,duration,genre,releaseDate,language,format,certification,picture,banner})
    }).then((res)=>{
        console.log(res);
        if(res.status==201){
            alert("success");
            window.location.href="../index.html"
        }
        else if(res.status==404){
            alert("fields are empty")
        }
        else{
            alert("error")
        }
        
    }).catch((error)=>{
        console.log(error);
        
    });
})
document.getElementById("picture").addEventListener("change",async(e)=>{
    picture=await convertToBase64(document.getElementById("picture").files[0]);
})

document.getElementById("banner").addEventListener("change",async(e)=>{
    banner=await convertToBase64(document.getElementById("banner").files[0]);
})
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
