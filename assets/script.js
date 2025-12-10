document.addEventListener('DOMContentLoaded', (event) => {
    // 1. Get all gallery items meant to open the modal (excluding the essay link).
    const modalItems = document.querySelectorAll('.thumb:not(.essay)'); 

    modalItems.forEach(item => {
        // Determine if the item is a video (logic for future use)
        const isVideo = item.classList.contains('video-item');
        
        item.addEventListener('click', (e) => {
            // IMPORTANT: Prevent default navigation ONLY for items meant to open the modal.
            // Since the photo items are intended to open the modal, we prevent their default link action.
            e.preventDefault(); 

            let src, type, caption, details;

            if (!isVideo) {
                // Image Logic
                const img = item.querySelector('img');
                if (!img) return; 

                src = img.src;
                type = 'image';
                caption = item.dataset.caption || "Caption pending (Lightroom data incomplete).";
                details = item.dataset.details || "Technical details pending.";
            } else {
                // Video Logic (Handles the video item if you reintroduce it)
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

    // 2. MODAL CREATION FUNCTION (Handles both image and video)
    function openModal(src, type, caption, details) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        // FIX A: Stop clicks on the content area from propagating to the background.
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation(); 
        });
        
        // --- CREATE CLOSE BUTTON ---
        const closeButton = document.createElement('span');
        closeButton.innerHTML = '&times;'; // HTML entity for 'x'
        closeButton.className = 'modal-close-btn'; 
        modalContent.appendChild(closeButton);
        
        // --- CLOSE BUTTON LISTENER ---
        closeButton.addEventListener('click', () => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        });

        // Handle Image vs. Video content insertion
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

        // Text Content and Details append logic
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

        // 3. Close Modal Listener (Background Click)
        // This only fires if the click target is the modal container itself.
        modal.addEventListener('click', (e) => {
            if (e.target === modal) { 
                document.body.removeChild(modal);
            }
        });

        document.body.appendChild(modal);
    }
});