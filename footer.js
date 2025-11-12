/* ---------------------------------------------------------
   footer-email.js – decodes an obfuscated address and
   injects a real mailto: link into the footer.
   --------------------------------------------------------- */

// 1️⃣ Store the address in a reversible format.
 // • Here we use Base64 because it’s short and easy to decode.
 // • "info@example.com" → "aW5mb0BleGFtcGxlLmNvbQ=="
const encodedAddress = "Y29udGFjdEBhbmdlbHBhZHJlcy5jb20=";

// 2️⃣ Decode it (atob = ASCII‑to‑binary, built‑in in browsers)
const decoded = atob(encodedAddress);   // → "info@example.com"

// 3️⃣ Find the placeholder element in the footer.
const placeholder = document.getElementById('footer');

if (placeholder) {
    // Build a proper mailto link.
    const link = document.createElement('a');
    link.href = `mailto:${decoded}`;
    link.textContent = decoded;          // what the user sees
    link.style.wordBreak = "break-all"; // prevent overflow on tiny screens

    // Replace the placeholder with the real link.
    placeholder.parentNode.replaceChild(link, placeholder);
}