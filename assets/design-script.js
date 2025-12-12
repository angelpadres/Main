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



function openOverlay(url, type) {
    const content = document.getElementById('lightbox-content');
    content.innerHTML = '';

    let el;
    if (type === 'img') {
        el = document.createElement('img');
        el.src = url;
        el.alt = 'Preview';
    } else if (type === 'video' || type === 'pdf') {
        el = document.createElement('iframe');
        el.src = url;
        if (type === 'video') {
            el.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
        }
        el.setAttribute('allowfullscreen', '');
    } else {
        console.warn('Unsupported overlay type:', type);
        return;
    }

    content.appendChild(el);
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeOverlay() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('lightbox-content').innerHTML = '';
}

/* close with Escape key */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('lightbox').style.display === 'flex') {
        closeOverlay();
    }
});

/* close when clicking the dark background */
document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === e.currentTarget) {
        closeOverlay();
    }
});