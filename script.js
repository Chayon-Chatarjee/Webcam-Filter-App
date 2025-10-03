// sources
const webcam = document.getElementById("webcam");
let snapshot = document.getElementById("snapshot");
const capture = document.getElementById("capture");
let download = document.getElementById("download");
let canvas = document.getElementById("canvas")
let snapshot_part = document.getElementById("snapshot-part");
let label = document.getElementById("label");
let filter = document.getElementById("filter");

// contexts
let context = canvas.getContext("2d");

// variables
let current = 0;

// filters
let filters = [
    { name: "None", style: "none" },
    { name: "Grayscale", style: "grayscale(100%)" },
    { name: "Invert", style: "invert(100%)" },
    { name: "Sepia", style: "sepia(100%)" },
    { name: "Blur", style: "blur(5px)" },
    { name: "Brightness+", style: "brightness(150%)" },
    { name: "Brightness-", style: "brightness(50%)" },
    { name: "Contrast+", style: "contrast(200%)" },
    { name: "Contrast-", style: "contrast(50%)" },
    { name: "Saturate+", style: "saturate(200%)" },
    { name: "Saturate-", style: "saturate(50%)" },
    { name: "Hue Rotate 90°", style: "hue-rotate(90deg)" },
    { name: "Hue Rotate 180°", style: "hue-rotate(180deg)" },
    { name: "Hue Rotate 270°", style: "hue-rotate(270deg)" },
    { name: "Opacity 50%", style: "opacity(50%)" },
    { name: "Shadow Glow", style: "drop-shadow(10px 10px 10px #000)" },
    { name: "Warm Tone", style: "sepia(60%) saturate(150%) hue-rotate(-15deg)" },
    { name: "Cool Tone", style: "sepia(30%) saturate(200%) hue-rotate(180deg)" },
    { name: "Vintage", style: "sepia(40%) contrast(90%) brightness(90%) saturate(120%)" },
    { name: "High Contrast BW", style: "grayscale(100%) contrast(200%)" },
    { name: "Cartoon", style: "contrast(150%) saturate(120%) brightness(110%)" },
    { name: "Dreamy", style: "blur(3px) brightness(120%) saturate(130%)" },
    { name: "Cyberpunk", style: "hue-rotate(300deg) saturate(250%) brightness(120%)" },
    { name: "Washed Out", style: "brightness(120%) contrast(70%) saturate(50%)" }
];

//  display none of snapshot_part
snapshot_part.style.display = "none";

// link webcam  
function startWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (sources) {
            let video = document.createElement('video');
            video.srcObject = sources;
            video.play();

            // when video is ready
            video.addEventListener('loadeddata', function () {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                drawToCanvas(video);
            })

            canvas.addEventListener("click",function(){
                changeFilter()
            })

            function drawToCanvas(video) {
                context.filter = filters[current].style;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                requestAnimationFrame(function () {
                    drawToCanvas(video);
                });
            }
        }).catch(function(error){
            alert("Webcam nor found or access denied!" , error);
        })
    function changeFilter() {
        current = (current + 1) % filters.length;
        label.textContent = filters[current].name;
    }
}
    
startWebcam();


capture.addEventListener("click", function () {
    takeSelfie();
    snapshot_part.style.display = "block";
})

function takeSelfie(){
    const image = canvas.toDataURL("image/png");
    snapshot.innerHTML = `<img src="${image}" id ="photo" width ="600" height ="500" />`;
    snapshot.style.display = "block";
}


download.addEventListener("click", function(){
    let picture = canvas.toDataURL("image/png");
    let a = document.createElement("a");
    a.href = picture;
    a.download = "Your Filtered Image.png";
    a.click();
})
