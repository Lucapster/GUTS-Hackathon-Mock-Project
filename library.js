// This will probably be a part of profile-script.js in the future


import pool from './connect_to_db.js'


class Song {
  constructor(song_id, title, artists, album, duration, popularity, is_explicit) {
    this.song_id = song_id;
    this.title = title;
    this.artists = artists;
    this.album = album;
    this.duration = duration;
    this.popularity = popularity;
    this.is_explicit = is_explicit;
  }

  add_to_playlist(playlist) {
    playlists[playlist].add_song(this);
    }
  }

class Playlist {
  constructor(songs = []) {
    this.songs = songs;
  }

  async add_song(song) {
    if (song != null) {
      this.songs.push(song);
      try {
            const [results, fields] = await pool.query(
              'INSERT INTO playlist_song (playlist_id, spotify_id) VALUES (?, ?)', [this.playlist_id, song.song_id] //'playlist_song' is the name of the relationship table
            );
            console.log(results); 
            console.log(fields); 
      } 
      catch (err) {
        console.log(err);
      }

    }
  }

  remove_song(index) {
    index = Number(index);
    is_a_number = !Number.isNaN(index); 
    if (is_a_number && index >= 0 && index < this.songs.length) {
      song_object = this.songs[index] 
      this.songs.splice(index, 1);
      try {
          const [results, fields] = await pool.query(
            'DELETE FROM playlist_song WHERE song_id=? AND index=?', [song_object.song_id, index] //'playlist_song' is the name of the relationship table
          );
          console.log(results); 
          console.log(fields); 
        } catch (err) {
          console.log(err);
        }
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
