import './style.css';
import Upscaler from 'upscaler';
import x2 from '@upscalerjs/esrgan-thick/2x';

// Initialize Upscaler with the heavy-duty ESRGAN model for HD results
const upscaler = new Upscaler({
    model: x2
});

const dropZone = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const editorArea = document.getElementById('editor-area');
const loadingIndicator = document.getElementById('loading');
const resultContainer = document.getElementById('result-container');
const originalImage = document.getElementById('original-image');
const resultImage = document.getElementById('result-image');
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');

let currentFile = null;
let upscaledDataUrl = null;

// File Upload Logic (Click & Drag-Drop)
dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length) {
        handleFile(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        handleFile(e.target.files[0]);
    }
});

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Tolong unggah file gambar (JPG, PNG, WebP).');
        return;
    }
    
    currentFile = file;
    const reader = new FileReader();
    
    reader.onload = (e) => {
        // Show Editor Area, Hide Drop Zone
        dropZone.style.display = 'none';
        editorArea.style.display = 'block';
        loadingIndicator.style.display = 'block';
        resultContainer.style.display = 'none';
        
        // Render Original Image
        originalImage.src = e.target.result;
        
        // Create an Image object for the Upscaler
        const imgObj = new Image();
        imgObj.src = e.target.result;
        imgObj.onload = () => {
            processUpscale(imgObj);
        };
    };
    reader.readAsDataURL(file);
}

async function processUpscale(imageElement) {
    try {
        // Run the AI model in the browser
        // For performance, we just call upscale() which defaults to 2x super resolution
        upscaledDataUrl = await upscaler.upscale(imageElement, {
            patchSize: 32,
            padding: 4
        });
        
        // Show Result
        resultImage.src = upscaledDataUrl;
        loadingIndicator.style.display = 'none';
        resultContainer.style.display = 'block';
        
    } catch (error) {
        console.error('Upscaling Error:', error);
        alert('Terjadi kesalahan saat memproses gambar. Gambar mungkin terlalu besar untuk diproses di memori perangkat ini.');
        resetApp();
    }
}

// Download Button Logic
downloadBtn.addEventListener('click', () => {
    if (!upscaledDataUrl) return;
    
    const link = document.createElement('a');
    link.href = upscaledDataUrl;
    link.download = `imagify-upscaled-${currentFile.name}`;
    link.click();
});

// Reset Button Logic
resetBtn.addEventListener('click', resetApp);

function resetApp() {
    currentFile = null;
    upscaledDataUrl = null;
    fileInput.value = '';
    
    editorArea.style.display = 'none';
    resultContainer.style.display = 'none';
    dropZone.style.display = 'flex';
}
