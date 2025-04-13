let displayedManhwa = 0;
const manhwaPerPage = 5;
let manhwaData = [];

// Display Item
function displayManhwa(data) {
    const manhwaList = document.getElementById('manhwa-list');
    data.slice(displayedManhwa, displayedManhwa + manhwaPerPage).forEach(manhwa => {
        const manhwaItem = document.createElement('div');
        manhwaItem.classList.add('manhwa-item');

        manhwaItem.innerHTML = `
            <img src="${manhwa.image}" alt="${manhwa.title}" class="manhwa-image" onerror="this.onerror=null;this.src='images/void.jpg';">
            <h2>${manhwa.title}</h2>
            <p><strong>Genre:</strong> ${manhwa.genre}</p>
            <p>${manhwa.description}</p>
        `;

        manhwaList.appendChild(manhwaItem);
    });
    displayedManhwa += manhwaPerPage;
}

// Fetch from json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        manhwaData = data;
        displayManhwa(manhwaData);

        // Load more
        document.getElementById('load-more').addEventListener('click', () => {
            displayManhwa(manhwaData);
            if (displayedManhwa >= manhwaData.length) {
                document.getElementById('load-more').style.display = 'none';
            }
        });

        // Simple search
        document.getElementById('search').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredData = manhwaData.filter(manhwa =>
                manhwa.title.toLowerCase().includes(searchTerm)
            );
            document.getElementById('manhwa-list').innerHTML = '';
            displayedManhwa = 0;
            displayManhwa(filteredData);
        });
    })
    .catch(error => console.error('Error loading data:', error));
