const API_KEY = "c16d199528e94a3c637166518ee8cd86";
const USERNAME = "AbbiBabbi123902";

const url =
  `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks` +
  `&user=${encodeURIComponent(USERNAME)}` +
  `&api_key=${API_KEY}` +
  `&format=json&limit=1`;

async function getRecentTrack() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const track = data.recenttracks.track[0];

    document.getElementById("track-name").textContent = track.name;
    document.getElementById("artist-name").textContent = track.artist["#text"];

    const artwork = track.image[3]["#text"];

    if (artwork) {
      document.getElementById("album-art").src = artwork;
    }

    if (track["@attr"] && track["@attr"].nowplaying === "true") {
      document.getElementById("listening-status").textContent = "Now listening";
    } else {
      document.getElementById("listening-status").textContent = "Recently played";
    }

  } catch (error) {
    console.error("Could not load Last.fm:", error);
    document.getElementById("listening-status").textContent =
      "Music couldn't be loaded";
  }
}

getRecentTrack();
