/* APP.JS
  This file controls all 8 boxes, strictly following the
  HTML structure and IDs from your specification.
*/

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------------------
    // 1. STATE MANAGEMENT
    // -----------------------------------------------------------------
    const gameState = {
        homeScore: 0,
        awayScore: 0,
        inning: 'T1', // Default based on your dropdown
        outs: 0,
        basesImage: 'assets/images/baseball-field-no-runners.jpg' // Default
    };

    // -----------------------------------------------------------------
    // 2. DOM ELEMENT REFERENCES
    // -----------------------------------------------------------------

    // Scoreboard Displays
    const homeScoreDisplay = document.getElementById('home-score-display');
    const awayScoreDisplay = document.getElementById('away-score-display');
    const inningDisplay = document.getElementById('inning-display');
    const outsDisplay = document.getElementById('outs-display'); // This is the SPAN
    const basesImage = document.getElementById('bases_image'); 

    // --- Box 1: Home Score ---
    const homeScoreIncBtn = document.getElementById('home-score-inc');
    const homeScoreDecBtn = document.getElementById('home-score-dec');

    // --- Box 2: Away Score ---
    const awayScoreIncBtn = document.getElementById('away-score-inc');
    const awayScoreDecBtn = document.getElementById('away-score-dec');
    
    // --- Box 3: Inning ---
    const inningSelect = document.getElementById('inning-drop-down'); 
    
    // --- Box 4: Outs ---
    const outsSelect = document.getElementById('outs-select'); 

    // --- Box 5: Bases ---
    const basesSelect = document.getElementById('bases-select'); 

    // --- Box 6: HITS & TEAMS ---
    const hitsTeamsForm = document.getElementById('hits-teams-form');
    const hitsTeamsSelect = document.getElementById('hits_team-drop-down');

    // --- Box 7: CALLS & PLAYS ---
    const callsPlaysForm = document.getElementById('calls-plays-form');
    const callsPlaysSelect = document.getElementById('calls_plays-drop-down');

    // --- Box 8: FUN & SKITS ---
    const funSkitsForm = document.getElementById('fun-skits-form');
    const funSkitsSelect = document.getElementById('fun_skits-drop-down');

    // Video Lightbox Elements
    const videoLightbox = document.getElementById('video-lightbox');
    const mainVideoPlayer = document.getElementById('main-video-player');
    const closeLightboxBtn = document.getElementById('close-lightbox-btn');
    
    // -----------------------------------------------------------------
    // 3. UPDATE & HELPER FUNCTIONS
    // -----------------------------------------------------------------
    
    // Updates all 5 scoreboard elements
    function updateScoreboard() {
        homeScoreDisplay.textContent = gameState.homeScore;
        awayScoreDisplay.textContent = gameState.awayScore;
        inningDisplay.textContent = gameState.inning; 
        outsDisplay.textContent = gameState.outs;
        basesImage.src = gameState.basesImage;
        
        // --- DYNAMIC OUTS COLOR ---
        // Per your spec, change the color of the outs number
        switch (gameState.outs) {
            case 0:
                outsDisplay.style.color = 'var(--outs-0-color)'; // Green
                break;
            case 1:
                outsDisplay.style.color = 'var(--outs-1-color)'; // Yellow
                break;
            case 2:
                outsDisplay.style.color = 'var(--outs-2-color)'; // Red
                break;
            default:
                outsDisplay.style.color = 'var(--outs-0-color)'; // Default to green
        }
    }

    // Opens the lightbox and plays the selected video
    function playVideo(videoSrc) {
        // Prepend "assets/" to your video paths to match the repo structure.
        const finalVideoSrc = `assets/${videoSrc}`;
        
        mainVideoPlayer.src = finalVideoSrc;
        videoLightbox.classList.remove('hidden');
        mainVideoPlayer.play();
    }

    // -----------------------------------------------------------------
    // 5. EVENT LISTENERS
    // -----------------------------------------------------------------

    // --- Box 1: Home Score Listeners ---
    homeScoreIncBtn.addEventListener('click', () => {
        gameState.homeScore++;
        updateScoreboard();
    });
    homeScoreDecBtn.addEventListener('click', () => {
        if (gameState.homeScore > 0) {
            gameState.homeScore--;
            updateScoreboard();
        }
    });

    // --- Box 2: Away Score Listeners ---
    awayScoreIncBtn.addEventListener('click', () => {
        gameState.awayScore++;
        updateScoreboard();
    });
    awayScoreDecBtn.addEventListener('click', () => {
        if (gameState.awayScore > 0) {
            gameState.awayScore--;
            updateScoreboard();
        }
    });

    // --- Box 3: Inning Listener ---
    inningSelect.addEventListener('change', () => {
        gameState.inning = inningSelect.value;
        updateScoreboard();
    });

    // --- Box 4: Outs Listener ---
    outsSelect.addEventListener('change', () => {
        gameState.outs = parseInt(outsSelect.value, 10); 
        updateScoreboard();
    });

    // --- Box 5: Bases Listener ---
    basesSelect.addEventListener('change', () => {
        gameState.basesImage = basesSelect.value; 
        updateScoreboard();
    });

    // --- Box 6: HITS & TEAMS Listener ---
    hitsTeamsForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const selectedVideo = hitsTeamsSelect.value; 
        playVideo(selectedVideo);
    });

    // --- Box 7: CALLS & PLAYS Listener ---
    callsPlaysForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const selectedVideo = callsPlaysSelect.value;
        playVideo(selectedVideo);
    });

    // --- Box 8: FUN & SKITS Listener ---
    funSkitsForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const selectedVideo = funSkitsSelect.value;
        playVideo(selectedVideo);
    });

    // --- Lightbox Close Button ---
    closeLightboxBtn.addEventListener('click', () => {
        videoLightbox.classList.add('hidden'); 
        mainVideoPlayer.pause(); 
        mainVideoPlayer.src = ""; // Clear the source
    });

    // -----------------------------------------------------------------
    // 6. INITIALIZATION
    // -----------------------------------------------------------------
    updateScoreboard();

});