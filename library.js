// This will probably be a part of profile-script.js in the future

class Song {
  constructor(id, title, artist, album, duration) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.duration = duration;
    this.explicit = false; // default value
  }

  add_to_playlist(playlist) {
    userLibrary.playlists[playlist].add_song(this);
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
    }
  }

  remove_song(index) {
    index = Number(index);
    if (!Number.isNaN(index) && index >= 0 && index < this.songs.length) {
      const songId = this.songs[index].id;
      this.songs.splice(index, 1);
      // and SQL stuff with index and id
    }
  }
}

class Library {
  constructor(playlists = []) {
    this.playlists = playlists;
  }

  add_playlist(playlist) {
    if (playlist != null) {
      this.playlists.push(playlist);
      // and SQL stuff
    }
  }
}

let userLibrary = new Library();
let entered_playlist = false;
userLibrary.add_playlist(new Playlist());
userLibrary.add_playlist(new Playlist());
userLibrary.add_playlist(new Playlist());

// temporary values for testing
userLibrary.playlists[0].add_song('Song A');
userLibrary.playlists[0].add_song('Song B');
userLibrary.playlists[0].add_song('Song C');
userLibrary.playlists[0].add_song('Song D');
userLibrary.playlists[0].add_song('Song E');
userLibrary.playlists[1].add_song('Song F');
userLibrary.playlists[1].add_song('Song G');
userLibrary.playlists[2].add_song('Song H');
userLibrary.playlists[2].add_song('Song I');
userLibrary.playlists[2].add_song('Song J');

function renderLibrary() {
  const container = document.getElementById('library');
  if (!container) return;
  container.innerHTML = ''; // clear

  const ul = document.createElement('ul');
  userLibrary.playlists.forEach((playlist, i) => {
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

// render function: builds DOM for the playlist and buttons
function renderPlaylist(playlist_index) {
  const container = document.getElementById('playlist');
  if (!container) return;
  entered_playlist = true;
  container.innerHTML = '';

  const back = document.createElement('button');
  back.type = 'button';
  back.id = 'back-to-library';
  back.textContent = 'Back to library';
  container.appendChild(back);

  const title = document.createElement('h2');
  title.textContent = userLibrary.playlists[playlist_index].name || `Playlist ${playlist_index}`;
  container.appendChild(title);

  const ul = document.createElement('ul');
  userLibrary.playlists[playlist_index].songs.forEach((song, i) => {
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

function unrenderPlaylist() {
  const container = document.getElementById('playlist');
  if (container) container.innerHTML = '';
  playlist_index = null;
  entered_playlist = false;
  renderLibrary();
}

// event delegation: one listener handles all remove clicks
document.addEventListener('DOMContentLoaded', () => {
  renderLibrary();

  const libraryContainer = document.getElementById('library');
  if (!libraryContainer) return;
  const playlistContainer = document.getElementById('playlist');
  if (!playlistContainer) return;

  libraryContainer.addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.classList && btn.classList.contains('enter-playlist')) {
      const idx = btn.dataset.index;
      if (entered_playlist) unrenderPlaylist();
      playlist_index = idx;
      renderPlaylist(playlist_index);
    }
  });

  playlistContainer.addEventListener('click', (e) => {
    console.log('Playlist container clicked', e);
    const btn = e.target;
    if (btn.classList && btn.classList.contains('remove-song')) {
      const idx = btn.dataset.index;
      console.log('Removing index', idx);
      userLibrary.playlists[playlist_index].remove_song(idx);
      renderPlaylist(playlist_index); // re-render with updated indexes
    }
    if (btn.id === 'back-to-library') {
      console.log('Back to library button clicked');
      unrenderPlaylist();
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
