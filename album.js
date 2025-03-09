document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    track.innerHTML += track.innerHTML; 

    const images = document.querySelectorAll(".carousel-track img");
    const popup = document.querySelector(".popup");
    const popupImg = document.getElementById("popup-img");
    const popupArtist = document.getElementById("popup-artist");
    const popupSong = document.getElementById("popup-song");
    const closeBtn = document.querySelector(".close");

    images.forEach(img => {
        img.addEventListener("click", () => {
            popupImg.src = img.src;
            popupArtist.textContent = `Исполнитель: ${img.dataset.artist}`; 
            popupSong.textContent = `Песня: ${img.dataset.song}`; 
            popup.classList.remove("hidden");
        });
    });

    closeBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) popup.classList.add("hidden");
    });
});

document.querySelectorAll(".genre img").forEach(img => {
    img.addEventListener("click", () => {
        alert("Вы выбрали жанр: " + img.alt);
    });
});