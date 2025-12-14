document.addEventListener('DOMContentLoaded', (event) => {
    
    const modalItems = document.querySelectorAll('.thumb:not(.essay)'); 

    modalItems.forEach(item => {

        const isVideo = item.classList.contains('video-item');
        
        item.addEventListener('click', (e) => {
            e.preventDefault(); 

            let src, type, caption, details;

            if (!isVideo) {

                const img = item.querySelector('img');
                if (!img) return; 

                src = img.src;
                type = 'image';
                caption = item.dataset.caption || "Caption pending (Lightroom data incomplete).";
                details = item.dataset.details || "Technical details pending.";
            } else {

                const iframe = item.querySelector('iframe');
                if (!iframe) return; 

                src = iframe.src;
                type = 'video';
                caption = item.dataset.caption || "Caption pending.";
                details = item.dataset.details || "Details pending.";
            }

            openModal(src, type, caption, details);
        });
    });


    function openModal(src, type, caption, details) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';


        modalContent.addEventListener('click', (e) => {
            e.stopPropagation(); 
        });
        

        const closeButton = document.createElement('span');
        closeButton.innerHTML = '&times;'; 
        closeButton.className = 'modal-close-btn'; 
        modalContent.appendChild(closeButton);
        

        closeButton.addEventListener('click', () => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        });


        if (type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = src;
            iframe.style.width = 'calc(100% - 20px)'; 
            iframe.style.height = '60vh'; 
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
        const processedDetails = details.replace(/f\//g, '<i>f</i>/'); 
        detailsElement.innerHTML = processedDetails;

        textContent.appendChild(captionElement);
        textContent.appendChild(detailsElement);

        modalContent.appendChild(textContent);
        modal.appendChild(modalContent);


        modal.addEventListener('click', (e) => {
            if (e.target === modal) { 
                document.body.removeChild(modal);
            }
        });

        document.body.appendChild(modal);
    }
});