
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


const dreamImages = [
    { src: 'images/design/hammock_dream.jpg' },
    { src: 'images/design/casino_dream.jpg' },
    { src: 'images/design/sunglasses_dream.jpg' },
    { src: 'images/design/pool_planet_dream.jpg' },
    { src: 'images/design/visitor_dream.jpg'}
];
let dreamCurrentIndex = 0;

function openDreamSeries() {
    const content = document.getElementById('lightbox-content');
    content.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'lightbox-grid';

    dreamImages.forEach((item, i) => {
        const thumb = document.createElement('img');
        thumb.src = item.src;
        thumb.alt = item.caption;
        thumb.className = 'grid-thumb';
        thumb.dataset.idx = i;
        thumb.onclick = () => showDreamSlide(i);
        grid.appendChild(thumb);
    });

    content.appendChild(grid);
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}


function showDreamSlide(idx) {
    dreamCurrentIndex = idx;

    const content = document.getElementById('lightbox-content');
    content.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'slide-wrapper';

    const img = document.createElement('img');
    img.src = dreamImages[idx].src;
    img.alt = dreamImages[idx].caption;
    img.className = 'slide-img';
    wrapper.appendChild(img);

    const caption = document.createElement('p');
    caption.className = 'slide-caption';
    caption.textContent = dreamImages[idx].caption;
    wrapper.appendChild(caption);

    const left = document.createElement('span');
    left.className = 'slide-arrow left';
    left.innerHTML = '&#10094;';
    left.onclick = () => showDreamSlide((dreamCurrentIndex - 1 + dreamImages.length) % dreamImages.length);
    wrapper.appendChild(left);

    const right = document.createElement('span');
    right.className = 'slide-arrow right';
    right.innerHTML = '&#10095;';
    right.onclick = () => showDreamSlide((dreamCurrentIndex + 1) % dreamImages.length);
    wrapper.appendChild(right);

    const back = document.createElement('span');
    back.className = 'slide-back';
    back.textContent = '↩︎ Back to grid';
    back.onclick = openDreamSeries;
    wrapper.appendChild(back);

    content.appendChild(wrapper);
}


document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('lightbox').style.display === 'flex') {
        closeOverlay();
    }
});
document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === e.currentTarget) {
        closeOverlay();
    }
});