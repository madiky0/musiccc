document.addEventListener("DOMContentLoaded", function () {
    const albums = document.querySelectorAll(".album");
    const audioPlayer = document.getElementById("audioPlayer");
    const leftBtn = document.getElementById("leftBtn");
    const rightBtn = document.getElementById("rightBtn");

    let currentIndex = 0; 

    function updateAlbums() {
        albums.forEach((album, index) => {
            if (index >= currentIndex && index < currentIndex + 4) {
                album.classList.add("active");
                album.classList.remove("hidden");
            } else {
                album.classList.remove("active");
                album.classList.add("hidden");
            }
        });
    }

    
    rightBtn.addEventListener("click", function () {
        currentIndex = (currentIndex + 4) % albums.length;
        updateAlbums();
    });

    
    leftBtn.addEventListener("click", function () {
        currentIndex = (currentIndex - 4 + albums.length) % albums.length;
        updateAlbums();
    });

    
    albums.forEach((album) => {
        album.addEventListener("click", function () {
            const audioSrc = album.getAttribute("data-audio");

            if (audioSrc) {
                audioPlayer.src = audioSrc;
                audioPlayer.style.display = "block";
                
                
                audioPlayer.load();
                audioPlayer.play().catch(error => {
                    console.log("Автовоспроизведение заблокировано браузером:", error);
                });
            }
        });
    });

    updateAlbums(); 
});

const albums = document.querySelectorAll(".album");
const audioPlayer = document.getElementById("audioPlayer");

albums.forEach(album => {
    album.addEventListener("click", function () {
        const audioSrc = album.getAttribute("data-audio");
        if (audioSrc) {
            if (audioPlayer.src !== location.origin + "/" + audioSrc) {
                audioPlayer.src = audioSrc;
                audioPlayer.style.display = "block"; 
                audioPlayer.play();
            } else {
                if (audioPlayer.paused) {
                    audioPlayer.play();
                } else {
                    audioPlayer.pause();
                }
            }
        }
    });
});


