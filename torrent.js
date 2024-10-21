const WebTorrent = require('webtorrent');

const client = new WebTorrent();

function downloadTorrent(torrentId, downloadPath) {
  client.add(torrentId, { path: downloadPath }, (torrent) => {
    console.log(`Downloading: ${torrent.name}`);

    torrent.on('download', (bytes) => {
      const progress = (torrent.downloaded / torrent.length) * 100;
      console.log(`Progress: ${progress.toFixed(2)}%`);
    });

    torrent.on('done', () => {
      console.log('Download complete');
    });

    torrent.on('error', (err) => {
      console.error('Error downloading torrent:', err);
    });
  });
}

function handleError(err) {
  console.error('Torrent error:', err);
  alert('An error occurred while downloading the torrent. Please try again.');
}

function displayProgress(torrent) {
  const progressBar = document.getElementById('torrent-progress-bar');
  torrent.on('download', (bytes) => {
    const progress = (torrent.downloaded / torrent.length) * 100;
    progressBar.style.width = `${progress.toFixed(2)}%`;
  });
}

function manageStorage(torrent) {
  const storagePath = 'downloads/';
  client.add(torrent, { path: storagePath }, (torrent) => {
    console.log(`Storing torrent in: ${storagePath}`);
  });
}

module.exports = {
  downloadTorrent,
  handleError,
  displayProgress,
  manageStorage,
};
