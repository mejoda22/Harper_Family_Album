// --- 1. Family Reels Data ---
const familyReels = [
  {
    id: 'reel-1',
    title: "Welcome Home Harper",
    date: 'Bend, OR • Apr 2021',
    playbackId: '5QKagEKvMZ8wd4w00tsvunAkTRucV601dMkAuIY8uMthA' 
  },
  {
    id: 'reel-2',
    title: 'Date Night Messages to Mom & Dad',
    date: 'The old farmhouse • Sept 2023',
    playbackId: 'Qk2CQx5Dv2zaApBrVdxqJ9fnRTAg7qcuHm2kypH76W8'
  },
  {
    id: 'reel-3',
    title: "Harper & Loki",
    date: 'Bend, OR • May 2021',
    playbackId: 'FV1CH3pqAuvhu1V1BT4A9mh9trWBnbXwDFuQ4eKoALg'
  },
    {
    id: 'reel-4',
    title: "Winter Nights in Vermont",
    date: 'Farmhouse • Feb 2023',
    playbackId: 'ynswRshyd14ER173wsbNAZ02Pk1Io01kbGh8iIxcb01uFg'
  },
  {
    id: 'reel-5',
    title: "Baby Babbles",
    date: 'Farmhouse • Sept 2021',
    playbackId: 'u7jXp3nrVkewZWc5s4qf6XqETc4dfRJue0125n014sjWw'
  },
  {
    id: 'reel-6',
    title: "Billy Jean",
    date: 'Bend, OR • May 2021',
    playbackId: 'nTmlUiGa1gULQr7hXMAdo00Uuq02R2012BnayGViqLUt1k'
  },
  {
    id: 'reel-7',
    title: "Tabby McTat",
    date: 'Daycare • Nov 2023',
    playbackId: 'KWhDYuIUU67ZkXdWHPIUhZX00LtHNVyteMNrjpRpgmEE'
  },
  {
    id: 'reel-8',
    title: "First Day Home",
    date: 'Bend, OR • Apr 2021',
    playbackId: '9Ue71XSmZWbFcpoOvFgJSzZ01fFRcHJzafYX27PsCYBI'
  
  },
  {
    id: 'reel-9',
    title: "Hola Harper",
    date: 'Farmhouse • June 2023',
    playbackId: '8SsaNcJ9q38525dih6YrZX36lohbUpHPzsiI501fXRTg'
  }
 
];

// --- 2. Initialize Video.js Player ---
const player = videojs('family-player', {
  autoplay: false,
  controls: true,
  responsive: true,
  fluid: true
});

// --- 3. DOM Elements ---
const reelListContainer = document.getElementById('reel-list');
const currentTitleElement = document.getElementById('current-title');

// --- 4. Switch Player Source ---
function loadReel(reel) {
  const streamUrl = `https://stream.mux.com/${reel.playbackId}.m3u8`;

  // Update player source
  player.src({
    src: streamUrl,
    type: 'application/x-mpegURL'
  });

  player.play();
  currentTitleElement.textContent = `${reel.title} (${reel.date})`;
}

// --- 5. Render Polaroid Cards ---
function renderGallery() {
  reelListContainer.innerHTML = '';

  familyReels.forEach((reel) => {
    // Generate poster thumbnail via Mux Image API
    const thumbnailUrl = `https://image.mux.com/${reel.playbackId}/thumbnail.jpg?width=400&time=2`;

    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.innerHTML = `
      <div class="polaroid-thumbnail-container">
        <img src="${thumbnailUrl}" alt="${reel.title}">
      </div>
      <div class="polaroid-label">${reel.title}</div>
    `;

    card.addEventListener('click', () => {
      loadReel(reel);
    });

    reelListContainer.appendChild(card);
  });
}

// Initial Run
renderGallery();

// Load the first video into the player on page load (paused)
if (familyReels.length > 0) {
  const initialReel = familyReels[0];
  player.src({
    src: `https://stream.mux.com/${initialReel.playbackId}.m3u8`,
    type: 'application/x-mpegURL'
  });
  currentTitleElement.textContent = `${initialReel.title} (${initialReel.date})`;
}