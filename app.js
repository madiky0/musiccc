const CLIENT_ID = 'YOUR_CLIENT_ID';  
const REDIRECT_URI = 'http://localhost:8888/callback';  
const SCOPES = 'user-library-read user-read-private user-read-playback-state';

let accessToken = null;


function loginToSpotify() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.href = authUrl;
}


function getAccessTokenFromUrl() {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get('access_token');
    if (token) {
        accessToken = token;
        localStorage.setItem('spotify_access_token', token);
        window.location.hash = '';  
        return token;
    }
    return null;
}


function fetchUserInfo() {
    const url = 'https://api.spotify.com/v1/me';
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('spotify-data').classList.remove('hidden');
        fetchCurrentTrack();
    })
    .catch(error => console.log('Error fetching user info:', error));
}


function fetchCurrentTrack() {
    const url = 'https://api.spotify.com/v1/me/player/currently-playing';
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.item) {
            document.getElementById('track-name').textContent = data.item.name;
            document.getElementById('track-artist').textContent = data.item.artists.map(artist => artist.name).join(', ');
        } else {
            document.getElementById('track-name').textContent = "No track is currently playing.";
        }
    })
    .catch(error => console.log('Error fetching track info:', error));
}


document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();  

    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    
    if (name === '' || email === '' || message === '') {
        showResponse('error', 'Please fill out all fields.');
        return;
    }


    setTimeout(function () {
        showResponse('success', 'Your message has been sent successfully!');
        document.getElementById('contact-form').reset();
    }, 1000);
});


function showResponse(type, message) {
    const responseDiv = document.getElementById('response');
    responseDiv.textContent = message;
    responseDiv.classList.remove('hidden');
    responseDiv.classList.remove('success', 'error');
    responseDiv.classList.add(type);
}


window.onload = () => {
    const storedToken = localStorage.getItem('spotify_access_token');
    if (storedToken) {
        accessToken = storedToken;
        fetchUserInfo();
    } else {
        getAccessTokenFromUrl();
    }
};
