let width = 500,
  height = 0,
  filter = "none",
  streaming = false;

//DOM Elements selection
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photos = document.getElementById("photos");
const photoButton = document.getElementById("photo-button");
const clearButton = document.getElementById("clear-button");
const photoFilter = document.getElementById("photo-filter");

//Get Media Stream
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(err => console.error(err));

//Play When Ready
video.addEventListener(
  "canplay",
  e => {
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width);

      video.setAttribute("width", width);
      video.setAttribute("height", height);
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);

      streaming = true;
    }
  },
  false
);

//Take Photo
photoButton.addEventListener("click", e => {
  takePicture();
  e.preventDefault();
});

//Photo Filter When Changes
photoFilter.addEventListener("change", e => {
  e.preventDefault();
  filter = e.target.value;
  video.style.filter = filter;
});

//Clear Event
clearButton.addEventListener("click", e => {
  e.preventDefault();
  photos.innerHTML = "";

  //Reset Filter
  filter = "none";

  // Apply Default filter
  video.style.filter = filter;

  //Reset Select List
  photoFilter.selectedIndex = 0;
});

//Take a Picture Func
takePicture = () => {
  const context = canvas.getContext("2d");
  if (width && height) {
    //Set canvas props
    canvas.width = width;
    canvas.height = height;

    //Draw an Image of the video on the canvas
    context.drawImage(video, 0, 0, width, height);

    //Create an Image from Canvas
    const imgUrl = canvas.toDataURL("image/png");
    //Create an Image Element in DOM
    const img = document.createElement("img");

    //Image Src
    img.setAttribute("src", imgUrl);

    //Add Filter
    img.style.filter = filter;
    photos.appendChild(img);
  }
};
