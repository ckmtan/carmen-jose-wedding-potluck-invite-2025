const card = document.getElementById('card');
const container = document.getElementById('cardContainer');
const flipSound = document.getElementById('flipSound');
const audioPlayer = document.getElementById('audioPlayer');  // Updated from bgMusic
const flipButton = document.getElementById('flipButton');
const musicButton = document.getElementById('musicButton');
const musicIcon = document.getElementById('musicIcon');

audioPlayer.volume = 0.05;

// Your playlist array — update with your actual audio file paths!
const playlist = [
  'audio/song1.mp3',
  'audio/song2.mp3',
  'audio/song3.mp3',
  'audio/song4.mp3'
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

