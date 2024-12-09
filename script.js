document.addEventListener('DOMContentLoaded', (event) => {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const isVideo = item.classList.contains('video-item');
        
        if (!isVideo) {
            // This is an image, so it will have the overlay and open the image in a modal
            const img = item.querySelector('img');
            const overlay = item.querySelector('.overlay');

            item.addEventListener('click', () => {
                const imgSrc = img.src;
                const imgAlt = img.alt;
                const imgCaption = item.dataset.caption;
                const imgDetails = item.dataset.details;

                openModal(imgSrc, 'image', imgCaption, imgDetails);
            });
        } else {
            // This is a video, no overlay, and open modal with video
            const iframeSrc = item.querySelector('iframe').src;
            const videoCaption = item.dataset.caption;
            const videoDetails = item.dataset.details;

            item.addEventListener('click', () => {
                openModal(iframeSrc, 'video', videoCaption, videoDetails);
            });
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const galleryItems = document.querySelectorAll('.gallery-item');
    
        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.overlay');
    
            item.addEventListener('click', () => {
                const imgSrc = img.src;
                const imgAlt = img.alt;
                const imgCaption = item.dataset.caption;
                const imgDetails = item.dataset.details;
    
                openModal(imgSrc, imgAlt, imgCaption, imgDetails);
            });
        });
    
        function openModal(src, alt, caption, details) {
            const modal = document.createElement('div');
            modal.className = 'modal';
    
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
    
            const img = document.createElement('img');
            img.src = src;
            img.alt = alt;
            modalContent.appendChild(img);
    
            const textContent = document.createElement('div');
            textContent.className = 'modal-text';
    
            const captionElement = document.createElement('p');
            captionElement.className = 'modal-caption';
            captionElement.textContent = caption;
    
            const detailsElement = document.createElement('p');
            detailsElement.className = 'modal-details';
            detailsElement.textContent = details;
    
            textContent.appendChild(captionElement);
            textContent.appendChild(detailsElement);
            modalContent.appendChild(textContent);
    
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
    
            modal.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        }
    });

    function openModal(src, type, caption, details) {
        const modal = document.createElement('div');
        modal.className = 'modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        if (type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = src;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;
            modalContent.appendChild(iframe);
        } else {
            const img = document.createElement('img');
            img.src = src;
            img.alt = caption;
            modalContent.appendChild(img);
        }

        const textContent = document.createElement('div');
        textContent.className = 'modal-text';

        const captionElement = document.createElement('p');
        captionElement.className = 'modal-caption';
        captionElement.textContent = caption;

        const detailsElement = document.createElement('p');
        detailsElement.className = 'modal-details';
        detailsElement.textContent = details;

        const processedDetails = details.replace(/f\//g, '<i>f</i>/');
        detailsElement.innerHTML = processedDetails;

        textContent.appendChild(detailsElement);
        textContent.appendChild(captionElement);

        modalContent.appendChild(textContent);
        modal.appendChild(modalContent);

        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        document.body.appendChild(modal);
    }
});