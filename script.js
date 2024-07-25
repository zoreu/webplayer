function searchTorrents() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const searchResults = document.getElementById('search-results');
            searchResults.innerHTML = ''; // Limpa os resultados anteriores

            const filteredData = data.filter(torrent => torrent.title.toLowerCase().includes(searchInput));
            if (filteredData.length === 0) {
                searchResults.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            } else {
                filteredData.forEach(torrent => {
                    const torrentDiv = document.createElement('div');
                    torrentDiv.className = 'torrent-link';

                    const torrentTitle = document.createElement('h2');
                    torrentTitle.textContent = torrent.title;

                    const torrentLink = document.createElement('a');
                    torrentLink.href = torrent.magnet;
                    torrentLink.textContent = 'Download';

                    torrentDiv.appendChild(torrentTitle);
                    torrentDiv.appendChild(torrentLink);
                    searchResults.appendChild(torrentDiv);
                });
            }
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
}
