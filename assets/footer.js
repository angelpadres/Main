
const encodedAddress = "Y29udGFjdEBhbmdlbHBhZHJlcy5jb20=";
const decoded = atob(encodedAddress); 
const placeholder = document.getElementById('footer');

if (placeholder) {
    const link = document.createElement('a');
    link.href = `mailto:${decoded}`;
    link.textContent = decoded; 
    link.style.wordBreak = "break-all"; 

    placeholder.parentNode.replaceChild(link, placeholder);
}