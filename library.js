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

  add_to_playlist(playlist_id) {
    userLibrary.playlists[playlist_id].add_song(this);
  }
}

class Playlist {
  constructor(songs = []) {
    this.songs = songs;
  }

  async add_song(song) {
    if (song != null) {
      this.songs.push(song);
    //   try {
    //         const [results, fields] = await pool.query(
    //           'INSERT INTO playlist_song (playlist_id, spotify_id) VALUES (?, ?)', [this.playlist_id, song.song_id] //'playlist_song' is the name of the relationship table
    //         );
    //         console.log(results); 
    //         console.log(fields); 
    //     } 
    //     catch (err) {
    //         console.log(err);
    //     }
    }
  }

  async remove_song(index) {
    index = Number(index);
    if (index >= 0 && index < this.songs.length) {
      const song_Id = this.songs[index].id;
      this.songs.splice(index, 1);
    //   try {
    //       const [results, fields] = await pool.query(
    //         'DELETE FROM playlist_song WHERE song_id=? AND index=?', [song_Id, index] //'playlist_song' is the name of the relationship table
    //       );
    //       console.log(results); 
    //       console.log(fields); 
    //     } catch (err) {
    //       console.log(err);
    //     }
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
userLibrary.playlists[0].add_song(new Song(1, 'Song A', 'Artist A', 'Album A', 210, 80, 0));
userLibrary.playlists[0].add_song(new Song(2, 'Song B', 'Artist B', 'Album B', 220, 85, 1));
userLibrary.playlists[0].add_song(new Song(3, 'Song C', 'Artist C', 'Album C', 230, 90, 0));
userLibrary.playlists[0].add_song(new Song(4, 'Song D', 'Artist D', 'Album D', 240, 95, 1));
userLibrary.playlists[0].add_song(new Song(5, 'Song E', 'Artist E', 'Album E', 250, 100, 0));
userLibrary.playlists[1].add_song(new Song(6, 'Song F', 'Artist F', 'Album F', 260, 105, 1));
userLibrary.playlists[1].add_song(new Song(7, 'Song G', 'Artist G', 'Album G', 270, 110, 0));
userLibrary.playlists[2].add_song(new Song(8, 'Song H', 'Artist H', 'Album H', 280, 115, 1));
userLibrary.playlists[2].add_song(new Song(9, 'Song I', 'Artist I', 'Album I', 290, 120, 0));
userLibrary.playlists[2].add_song(new Song(10, 'Song J', 'Artist J', 'Album J', 300, 125, 1));

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
    li.textContent = song.title;

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
    const btn = e.target;
    if (btn.classList && btn.classList.contains('remove-song')) {
      const idx = btn.dataset.index;
      userLibrary.playlists[playlist_index].remove_song(idx);
      renderPlaylist(playlist_index); // re-render with updated indexes
    }
    if (btn.id === 'back-to-library') {
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