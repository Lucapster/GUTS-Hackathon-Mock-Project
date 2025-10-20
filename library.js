class Playlist {
    constructor(songs = []) {
        this.songs = songs;
    }

    add_song(song) {
        if (song && !this.songs.includes(song)) {
            this.songs.push(song);
        }
    }

    remove_song(song) {
        const index = this.songs.indexOf(song);
        if (index > -1) {
            this.songs.splice(index, 1);
        }
    }
}

const apiUrl = 'https://api.example.com/data';
const outputElement = document.getElementById('output');

document.addEventListener('DOMContentLoaded', () => {
    const remove_songButton = document.getElementById('remove_songButton');
    if (remove_songButton) {
        remove_songButton.addEventListener('click', (event) => {
            // handler code when button is pressed
            console.log('Button pressed', event);
            outputElement.textContent = 'Button was pressed';
            // example: call Playlist methods or re-run fetch
            // playlist.add_song('New Song');
        });
    }
});

fetch(apiUrl)
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

