// Populate dropdown
const movieSelect = document.getElementById('movieSelect');
movies.forEach(movie => {
    const option = document.createElement('option');
    option.value = movie.id;
    option.textContent = `${movie.title} (${movie.year})`;
    movieSelect.appendChild(option);
});

// Build feature vector for a movie
function buildFeatures(movie) {
    return [...movie.genres, movie.director, ...movie.cast].map(f => f.toLowerCase());
}

// Create vocabulary from all movies
function buildVocabulary() {
    const vocab = new Set();
    movies.forEach(m => buildFeatures(m).forEach(f => vocab.add(f)));
    return Array.from(vocab);
}

// Convert movie features to binary vector
function vectorize(movie, vocab) {
    const features = buildFeatures(movie);
    return vocab.map(word => features.includes(word) ? 1 : 0);
}

// Cosine Similarity Algorithm
function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0, magA = 0, magB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        magA += vecA[i] * vecA[i];
        magB += vecB[i] * vecB[i];
    }
    const mag = Math.sqrt(magA) * Math.sqrt(magB);
    return mag === 0 ? 0 : dotProduct / mag;
}

// Get recommendations
function getRecommendations(selectedMovie, topN = 5) {
    const vocab = buildVocabulary();
    const selectedVector = vectorize(selectedMovie, vocab);
    
    const similarities = movies
        .filter(m => m.id !== selectedMovie.id)
        .map(movie => ({
            movie,
            score: cosineSimilarity(selectedVector, vectorize(movie, vocab))
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topN);
    
    return similarities;
}

// Display selected movie
function displaySelectedMovie(movie) {
    const container = document.getElementById('selectedMovie');
    container.innerHTML = `
        <h2>Selected Movie:</h2>
        <h3>${movie.title} (${movie.year})</h3>
        <p><strong>Genres:</strong> ${movie.genres.join(', ')}</p>
        <p><strong>Director:</strong> ${movie.director}</p>
        <p><strong>Cast:</strong> ${movie.cast.join(', ')}</p>
        <p><strong>Rating:</strong> ⭐ ${movie.rating}/10</p>
    `;
}

// Display recommendations
function displayRecommendations(results) {
    document.getElementById('resultsTitle').textContent = '🎯 Top Recommendations for You';
    const container = document.getElementById('recommendations');
    container.innerHTML = '';
    
    results.forEach(({ movie, score }) => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <h3>${movie.title}</h3>
            <p><strong>Year:</strong> ${movie.year}</p>
            <p><strong>Genres:</strong> ${movie.genres.join(', ')}</p>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Rating:</strong> ⭐ ${movie.rating}</p>
            <div class="similarity-score">Similarity: ${(score * 100).toFixed(2)}%</div>
        `;
        container.appendChild(card);
    });
}

// Display algorithm details
function displayAlgorithmDetails(selectedMovie, results) {
    const section = document.getElementById('algorithmSection');
    section.style.display = 'block';
    
    let html = `
        <p><strong>Algorithm:</strong> Cosine Similarity</p>
        <p><strong>Formula:</strong> cos(θ) = (A · B) / (||A|| × ||B||)</p>
        <p><strong>Features Used:</strong> Genres, Director, Cast</p>
        <table>
            <tr>
                <th>Movie</th>
                <th>Common Features</th>
                <th>Similarity Score</th>
            </tr>
    `;
    
    results.forEach(({ movie, score }) => {
        const common = [];
        selectedMovie.genres.forEach(g => { if (movie.genres.includes(g)) common.push(g); });
        if (selectedMovie.director === movie.director) common.push(movie.director);
        selectedMovie.cast.forEach(c => { if (movie.cast.includes(c)) common.push(c); });
        
        html += `
            <tr>
                <td>${movie.title}</td>
                <td>${common.length ? common.join(', ') : 'None'}</td>
                <td>${(score * 100).toFixed(2)}%</td>
            </tr>
        `;
    });
    
    html += '</table>';
    document.getElementById('algorithmDetails').innerHTML = html;
}

// Button click handler
document.getElementById('recommendBtn').addEventListener('click', () => {
    const movieId = parseInt(movieSelect.value);
    if (!movieId) {
        alert('Please select a movie first!');
        return;
    }
    
    const selectedMovie = movies.find(m => m.id === movieId);
    displaySelectedMovie(selectedMovie);
    
    const recommendations = getRecommendations(selectedMovie, 5);
    displayRecommendations(recommendations);
    displayAlgorithmDetails(selectedMovie, recommendations);
});