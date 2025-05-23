// Step 1: Define function near the top or grouped with other functions
function loadPotluckData() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbynFaDJRZNYLK36DuGFPQG3exebvqPZ-0eGjr3uxbS1-gEINaro7bbSxaVYXOufcF1w8Q/exec';
  
  const loadingDiv = document.getElementById('loading');
  const errorDiv = document.getElementById('error');
  const tbody = document.getElementById('potluckBody');

  loadingDiv.style.display = 'block';  // Show loading message
  errorDiv.textContent = '';            // Clear old errors
  tbody.innerHTML = '';                 // Clear old table rows

  fetch(scriptURL)
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch data');
      return response.json();
    })
    .then(data => {
      loadingDiv.style.display = 'none';  // Hide loading

      if (!data || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="2" style="text-align:center;">No potluck contributions yet.</td></tr>`;
        return;
      }

      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.name || ''}</td><td>${item.food || ''}</td>`;
        tbody.appendChild(row);
      });
    })
    .catch(error => {
      loadingDiv.style.display = 'none';  // Hide loading on error too
      if (errorDiv) errorDiv.textContent = 'Error loading data: ' + error.message;
    });
}

// Later in the file: Call the function when the DOM is ready and on potluck page
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('potluck-page')) {
    loadPotluckData();
  }
});

const card = document.getElementById('card');
const container = document.getElementById('cardContainer');
const flipSound = document.getElementById('flipSound');
const audioPlayer = document.getElementById('audioPlayer');  // Updated from bgMusic
const flipButton = document.getElementById('flipButton');
const musicButton = document.getElementById('musicButton');
const musicIcon = document.getElementById('musicIcon');

audioPlayer.volume = 0.1;

// Your playlist array — update with your actual audio file paths!
const playlist = [
  'audio/song1.mp3',
  'audio/song2.mp3',
  'audio/song3.mp3'
  // 'audio/song4.mp3'
];

let currentTrackIndex = 0;

// Function to load and play a track safely
function playTrack(index) {
  if (index < 0 || index >= playlist.length) {
    console.warn("Invalid track index:", index);
    return;
  }

  audioPlayer.src = playlist[index];
  audioPlayer.load();

  audioPlayer.play().catch((error) => {
    console.error("Audio play failed:", error);
  });
}

// Play the first track on page load
playTrack(currentTrackIndex);

// Event when a track ends
audioPlayer.addEventListener('ended', () => {
  currentTrackIndex++;

  if (currentTrackIndex >= playlist.length) {
    currentTrackIndex = 0; // Loop back to the first
  }

  playTrack(currentTrackIndex);
});

function flipCard() {
  card.classList.toggle('flipped');
  flipSound.currentTime = 0;
  flipSound.play();
}

flipButton.addEventListener('click', flipCard);

// Play/pause toggle for the playlist audio player
musicButton.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    musicIcon.textContent = 'pause';
  } else {
    audioPlayer.pause();
    musicIcon.textContent = 'play_arrow';
  }
});

// Rest of your existing code unchanged...
// (touch events, resizeContainer, sparkles, hearts, etc.)

let startX;  // Declare startX here to avoid reference error

card.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

card.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (Math.abs(endX - startX) > 50) {
    flipCard();
  }
});

function resizeContainer() {
  const vw = window.innerWidth;
  const vh = window.innerHeight - 100;
  const maxImageWidth = 1500;
  const maxImageHeight = 2100;
  const maxWidth = Math.min(vw * 0.8, maxImageWidth);
  const maxHeight = Math.min(vh * 0.8, maxImageHeight);
  const widthByHeight = maxHeight * (5 / 7);
  if (widthByHeight <= maxWidth) {
    container.style.height = maxHeight + 'px';
    container.style.width = widthByHeight + 'px';
  } else {
    container.style.width = maxWidth + 'px';
    container.style.height = (maxWidth * 7 / 5) + 'px';
  }
}

window.addEventListener('load', resizeContainer);
window.addEventListener('resize', resizeContainer);

function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  sparkle.style.left = (x - 4) + 'px';
  sparkle.style.top = (y - 4) + 'px';
  document.body.appendChild(sparkle);
  setTimeout(() => {
    sparkle.remove();
  }, 800);
}

// document.addEventListener('mousemove', (e) => {
//   createSparkle(e.clientX, e.clientY);
// });

// document.addEventListener('touchmove', (e) => {
//   if (e.touches.length > 0) {
//     const touch = e.touches[0];
//     createSparkle(touch.clientX, touch.clientY);
//   }
// });

function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = `${x - 10}px`;
  heart.style.top = `${y - 10}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}

document.addEventListener("mousemove", (e) => {
  createHeart(e.clientX, e.clientY);
});