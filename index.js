const poems = {
  nature: [
    "The trees whisper softly in the breeze,\nThe sky glows golden through the leaves,\nA river hums its gentle song,\nAs nature's peace rolls on and on.",
    "In fields of green where wildflowers grow,\nThe sunbeams dance and rivers flow,\nThe chirping birds in skies so wide,\nBring calm and joy we hold inside."
  ],
  love: [
    "In your smile, I find my peace,\nIn your eyes, my world’s release,\nWith every heartbeat, every sigh,\nMy soul is yours until I die.",
    "Love's a flame that brightly glows,\nEven through the highs and lows,\nIt lights our paths and warms the cold,\nA story new, yet ages old."
  ],
  sad: [
    "Raindrops fall like tears unseen,\nLost inside a fading dream,\nSilent nights and broken days,\nHope feels miles and miles away.",
    "Lonely moon in empty skies,\nAs I let go with quiet cries,\nThe world moves on, but I stay still,\nWith heavy heart and stubborn will."
  ],
  inspiration: [
    "Rise above, the sky’s your stage,\nLet your fire burn the cage,\nEvery fall is strength disguised,\nA phoenix born each time you rise.",
    "Chase the stars, embrace your spark,\nEven when the world seems dark,\nYour journey matters, don’t let go,\nYou’re the hero in your own show."
  ]
};

const moodBasedPoems = {
  happy: poems.love.concat(poems.inspiration),
  sad: poems.sad,
  motivational: poems.inspiration,
  relaxed: poems.nature
};

let voices = [];
let savedPoems = JSON.parse(localStorage.getItem("savedPoems")) || [];

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
};

function generatePoem() {
  const theme = document.getElementById("theme-select").value;
  const mood = document.getElementById("mood-select").value;
  const poemList = moodBasedPoems[mood] || poems[theme];
  const randomIndex = Math.floor(Math.random() * poemList.length);
  document.getElementById("poem-box").textContent = poemList[randomIndex];

  // Play background music when poem is generated
  const bgMusic = document.getElementById("bg-music");
  bgMusic.play();
}

function readPoem() {
  const poem = document.getElementById("poem-box").textContent;
  if (!poem) return alert("Please generate a poem first.");

  const utterance = new SpeechSynthesisUtterance(poem);
  const femaleVoice = voices.find(
    (voice) =>
      voice.name.includes("Google UK English Female") ||
      voice.name.includes("Microsoft Zira") ||
      (voice.name.toLowerCase().includes("female") && voice.lang.startsWith("en"))
  );

  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }

  utterance.pitch = 1.2;
  utterance.rate = 1;
  utterance.volume = 1;
  speechSynthesis.speak(utterance);
}

function copyPoem() {
  const text = document.getElementById("poem-box").textContent;
  if (!text) return alert("Nothing to copy!");
  navigator.clipboard.writeText(text).then(() => {
    alert("Poem copied to clipboard!");
  });
}

function savePoem() {
  const poem = document.getElementById("poem-box").textContent;
  if (!poem) return alert("Please generate a poem first.");
  savedPoems.push(poem);
  localStorage.setItem("savedPoems", JSON.stringify(savedPoems));
  alert("Poem saved!");
}

function sharePoem() {
  const poem = document.getElementById("poem-box").textContent;
  if (!poem) return alert("Please generate a poem first.");
  const shareText = encodeURIComponent(poem);
  const shareURL = `https://twitter.com/intent/tweet?text=${shareText}`;
  window.open(shareURL, "_blank");
}
