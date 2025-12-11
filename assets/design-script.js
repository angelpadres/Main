const dreamsData = [
    { src: "'../Main/images/design/hammock_dream.jpg'", caption: 'Dream 1: The Winding Road - Description of Techniques' },
    { src: '../Main/images/design/casino_dream.jpg', caption: 'Dream 2: The Silent Watcher - Description of Techniques' },
    { src: '../Main/images/design/sunglasses_dream.jpg', caption: 'Dream 3: Floating Worlds - Description of Techniques' },
    { src: '../Main/images/design/pool_planet_dreams.jpg', caption: 'Dream 4: Sunset Portal - Description of Techniques' },
    { src: '../Main/images/design/visitor_dream.jpg', caption: 'Dream 5: The City Below - Description of Techniques' }
];


let currentDreamIdx = 0;

const galleryModal      = document.getElementById('dreams-gallery-modal');
const mainImg           = document.getElementById('gallery-main-img');
const mainCaption       = document.getElementById('gallery-main-caption');
const thumbGrid         = document.getElementById('gallery-thumb-grid');

/* ---- BUILD THE GRID (run once) --------------------------- */
function buildDreamsThumbGrid() {
    // Clear any previous content (should only happen once)
    thumbGrid.innerHTML = '';

    dreamsData.forEach((item, idx) => {
        const thumb = document.createElement('img');
        thumb.src = item.src;                     // use the same image, scaled down
        thumb.alt = `Dream ${idx + 1}`;
        thumb.className = 'gallery-thumb';
        thumb.dataset.idx = idx;                  // store its index for click handling
        thumb.onclick = () => showDream(idx);     // clicking a thumb shows that image
        thumbGrid.appendChild(thumb);
    });
}

/* ---- SHOW ONE IMAGE (large preview) ---------------------- */
function showDream(idx) {
    // Wrap around if index is out of range
    if (idx >= dreamsData.length) idx = 0;
    if (idx < 0) idx = dreamsData.length - 1;

    currentDreamIdx = idx;

    const data = dreamsData[idx];
    mainImg.src = data.src;
    mainCaption.textContent = data.caption;

    // Highlight the active thumbnail
    const thumbs = thumbGrid.querySelectorAll('.gallery-thumb');
    thumbs.forEach(t => t.classList.remove('active'));
    thumbs[idx].classList.add('active');
}

/* ----  OPEN / CLOSE MODAL ----------------------------------- */
function openDreamsGallery(startIdx = 0) {
    // Build the grid the first time the modal is opened
    if (!thumbGrid.hasChildNodes()) buildDreamsThumbGrid();

    galleryModal.style.display = 'block';
    document.body.style.overflow = 'hidden';   // stop background scroll

    showDream(startIdx);                       // show the requested image
}

function closeDreamsGallery() {
    galleryModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

/* ---- NAVIGATION (arrows or keyboard) --------------------- */
function galleryChangeSlide(delta) {
    showDream(currentDreamIdx + delta);
}

/* Keyboard shortcuts – left/right arrows & Esc */
document.addEventListener('keydown', e => {
    if (galleryModal.style.display !== 'block') return; // ignore when closed

    if (e.key === 'ArrowLeft')  galleryChangeSlide(-1);
    if (e.key === 'ArrowRight') galleryChangeSlide(1);
    if (e.key === 'Escape')     closeDreamsGallery();
});