let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');

function showSlide(index) {
    if (index >= items.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = items.length - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

setInterval(nextSlide, 6000);

function openFullImage(element) {
    const images = Array.from(document.querySelectorAll('.carousel-item img'));
    currentIndex = images.indexOf(element.querySelector('img'));

    const fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.style.position = 'fixed';
    fullscreenOverlay.style.top = '0';
    fullscreenOverlay.style.left = '0';
    fullscreenOverlay.style.width = '100%';
    fullscreenOverlay.style.height = '100%';
    fullscreenOverlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
    fullscreenOverlay.style.display = 'flex';
    fullscreenOverlay.style.flexDirection = 'column';
    fullscreenOverlay.style.justifyContent = 'center';
    fullscreenOverlay.style.alignItems = 'center';
    fullscreenOverlay.style.zIndex = '9999';

    const imageContainer = document.createElement('div');
    imageContainer.style.position = 'relative';
    imageContainer.style.width = '90%';
    imageContainer.style.height = '80%';
    imageContainer.style.display = 'flex';
    imageContainer.style.justifyContent = 'center';
    imageContainer.style.alignItems = 'center';

    const fullImg = document.createElement('img');
    fullImg.src = images[currentIndex].src;
    fullImg.style.maxWidth = '100%';
    fullImg.style.maxHeight = '100%';
    fullImg.style.objectFit = 'contain';

    const caption = document.createElement('div');
    caption.textContent = images[currentIndex].alt;
    caption.style.color = '#fff';
    caption.style.marginTop = '20px';
    caption.style.fontSize = '18px';
    caption.style.textAlign = 'center';

    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&#10094;';
    prevButton.style.position = 'absolute';
    prevButton.style.left = '10px';
    prevButton.style.top = '50%';
    prevButton.style.transform = 'translateY(-50%)';
    prevButton.style.fontSize = '30px';
    prevButton.style.background = 'none';
    prevButton.style.border = 'none';
    prevButton.style.color = '#fff';
    prevButton.style.cursor = 'pointer';

    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&#10095;';
    nextButton.style.position = 'absolute';
    nextButton.style.right = '10px';
    nextButton.style.top = '50%';
    nextButton.style.transform = 'translateY(-50%)';
    nextButton.style.fontSize = '30px';
    nextButton.style.background = 'none';
    nextButton.style.border = 'none';
    nextButton.style.color = '#fff';
    nextButton.style.cursor = 'pointer';

    imageContainer.appendChild(fullImg);
    imageContainer.appendChild(prevButton);
    imageContainer.appendChild(nextButton);
    fullscreenOverlay.appendChild(imageContainer);
    fullscreenOverlay.appendChild(caption);

    document.body.appendChild(fullscreenOverlay);

    function updateImage() {
        fullImg.src = images[currentIndex].src;
        caption.textContent = images[currentIndex].alt;
    }

    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    });

    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    });

    fullscreenOverlay.addEventListener('click', () => {
        document.body.removeChild(fullscreenOverlay);
    });
}