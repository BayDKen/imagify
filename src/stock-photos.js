import './style.css';

// ==========================================
// PENTING: Ganti dengan Access Key Unsplash Anda!
// Dapatkan gratis di: https://unsplash.com/developers
// ==========================================
const UNSPLASH_ACCESS_KEY = 'qBf2TBVWbb_mCDileJfKmbH-NwW6OYVpdQbyV2mMxK4'; 

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const imageGrid = document.getElementById('image-grid');
const loadingIndicator = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadMoreContainer = document.getElementById('load-more-container');

let currentQuery = '';
let currentPage = 1;

// Event Listeners
searchBtn.addEventListener('click', () => {
    currentQuery = searchInput.value.trim();
    if (currentQuery) {
        currentPage = 1;
        imageGrid.innerHTML = '';
        loadMoreContainer.style.display = 'none';
        searchImages(currentQuery, currentPage);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    searchImages(currentQuery, currentPage);
});

async function searchImages(query, page) {


    loadingIndicator.style.display = 'block';
    errorMessage.style.display = 'none';
    
    if (page === 1) loadMoreContainer.style.display = 'none';
    else loadMoreBtn.innerText = 'Memuat...';

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=12&client_id=${UNSPLASH_ACCESS_KEY}`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Silakan periksa API Key Anda atau batas limit pencarian.`);
        }

        const data = await response.json();
        
        if (data.results.length === 0 && page === 1) {
            showError('Tidak ada gambar yang ditemukan untuk pencarian ini.');
            loadingIndicator.style.display = 'none';
            return;
        }

        displayImages(data.results);
        
        loadingIndicator.style.display = 'none';
        if (data.total_pages > page) {
            loadMoreContainer.style.display = 'block';
            loadMoreBtn.innerText = 'Muat Lebih Banyak';
        } else {
            loadMoreContainer.style.display = 'none';
        }
        
    } catch (error) {
        loadingIndicator.style.display = 'none';
        loadMoreContainer.style.display = 'none';
        showError(error.message);
    }
}

function displayImages(images) {
    images.forEach(image => {
        const imgCard = document.createElement('div');
        imgCard.className = 'grid-item';
        
        // Calculate aspect ratio padding for smooth loading
        const ratio = (image.height / image.width) * 100;
        
        imgCard.innerHTML = `
            <div class="img-wrapper" style="padding-bottom: ${ratio}%;">
                <img src="${image.urls.small}" alt="${image.alt_description || 'Stock photo'}" loading="lazy">
                <div class="img-overlay">
                    <p class="photographer" style="font-size: 0.8rem; line-height: 1.4;">
                        Foto oleh <a href="${image.user.links.html}?utm_source=imagify_superapp&utm_medium=referral" target="_blank" style="color: #fff; text-decoration: underline;">${image.user.name}</a> 
                        di <a href="https://unsplash.com/?utm_source=imagify_superapp&utm_medium=referral" target="_blank" style="color: #fff; text-decoration: underline;">Unsplash</a>
                    </p>
                    <a href="${image.links.download}&force=true" target="_blank" class="download-icon" download onclick="triggerDownload('${image.links.download_location}')">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </a>
                </div>
            </div>
        `;
        
        imageGrid.appendChild(imgCard);
    });
}

// Unsplash API requires triggering their download endpoint
window.triggerDownload = async function(downloadLocation) {
    try {
        await fetch(downloadLocation + '&client_id=' + UNSPLASH_ACCESS_KEY);
    } catch (e) {
        console.error('Failed to trigger Unsplash download endpoint', e);
    }
};

function showError(msg) {
    errorMessage.innerHTML = msg;
    errorMessage.style.display = 'block';
}

// Initial placeholder images on page load (Optional, using a random query)
// searchInput.value = 'abstract background';
// searchBtn.click();
