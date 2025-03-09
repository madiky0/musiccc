document.addEventListener("DOMContentLoaded", function() {
    const trackList = document.getElementById("track-list");

    
    const tracks = [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            cover: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png",
            preview: "blinding-lights.mp3"
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            cover: "https://upload.wikimedia.org/wikipedia/en/e/e1/Dua_Lipa_-_Levitating.png",
            preview: "levitating.mp3"
        },
        {
            title: "Peaches",
            artist: "Justin Bieber",
            cover: "https://upload.wikimedia.org/wikipedia/en/b/b3/Justin_Bieber_-_Peaches.png",
            preview: "peaches.mp3"
        }
    ];


    tracks.forEach(track => {
        const trackItem = document.createElement("div");
        trackItem.classList.add("track");
        trackItem.innerHTML = `
            <img src="${track.cover}" alt="${track.title}">
            <h3>${track.title}</h3>
            <p>${track.artist}</p>
            <audio controls>
                <source src="${track.preview}" type="audio/mpeg">
                Ваш браузер не поддерживает аудио.
            </audio>
        `;
        trackList.appendChild(trackItem);
    });
});