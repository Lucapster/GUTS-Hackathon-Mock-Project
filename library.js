// This will probably be a part of profile-script.js in the future

class Song {
  constructor(title, artist, album, duration) {
    this.title = title;
    this.artist = artist;
    this.album = album;
  }

  add_to_playlist(playlist) {
    playlists[playlist].add_song(this);
    // and SQL stuff
  }
}

class Playlist {
  constructor(songs = []) {
    this.songs = songs;
  }

  add_song(song) {
    if (song != null) {
      this.songs.push(song);
      // and SQL stuff
    }
  }

  remove_song(index) {
    index = Number(index);
    if (!Number.isNaN(index) && index >= 0 && index < this.songs.length) {
      this.songs.splice(index, 1);
      // and SQL stuff
    }
  }
}

class Library {
  constructor(playlists = []) {
    this.playlists = playlists;
  }
}

const library = new Library();

function renderLibrary() {
  const container = document.getElementById('library');
  if (!container) return;
  container.innerHTML = ''; // clear

  const ul = document.createElement('ul');
  library.playlists.forEach((playlist, i) => {
    const li = document.createElement('li');
    li.textContent = playlist.name;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'enter-playlist';
    btn.dataset.index = i; // use data-index to identify song
    btn.textContent = 'Enter';

    li.appendChild(btn);
    ul.appendChild(li);
  });

  container.appendChild(ul);
}

let playlists = [];

let playlist0 = new Playlist();
playlists.push(playlist0);
let playlist1 = new Playlist();
playlists.push(playlist1);
let playlist2 = new Playlist();
playlists.push(playlist2);
// temporary values for testing
playlists[0].add_song('Song A');
playlists[0].add_song('Song B');
playlists[0].add_song('Song C');

// render function: builds DOM for the playlist and buttons
function renderPlaylist(playlist_index) {
  const container = document.getElementById('playlist');
  if (!container) return;
  container.innerHTML = ''; // clear

  const ul = document.createElement('ul');
  playlists[playlist_index].songs.forEach((song, i) => {
    const li = document.createElement('li');
    li.textContent = song;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'remove-song';
    btn.dataset.index = i; // use data-index to identify song
    btn.textContent = 'Remove';

    li.appendChild(btn);
    ul.appendChild(li);
  });

  container.appendChild(ul);
}

//testing playlist
test_playlist_amount = 2;
playlist_index = 0;

// event delegation: one listener handles all remove clicks
document.addEventListener('DOMContentLoaded', () => {
  renderPlaylist(playlist_index);

  const container = document.getElementById('playlist');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.classList && btn.classList.contains('remove-song')) {
      const idx = btn.dataset.index;
      console.log('Removing index', idx);
      playlists[playlist_index].remove_song(idx);
      renderPlaylist(playlist_index); // re-render with updated indexes
    }
  });
});


/*fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Data not found');
      } else if (response.status === 500) {
        throw new Error('Server error');
      } else {
        throw new Error('Network response was not ok');
      }
    }
    return response.json();
  })
  .then(data => {
    outputElement.textContent = JSON.stringify(data, null, 2);
  })
  .catch(error => {
    console.error('Error:', error);
  });
*/
