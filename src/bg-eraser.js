import './style.css';
import { removeBackground } from '@imgly/background-removal';

    const uploadArea = document.getElementById('upload-area');
    const imageUpload = document.getElementById('image-upload');
    const processing = document.getElementById('processing');
    const resultArea = document.getElementById('result-area');
    const originalImage = document.getElementById('original-image');
    const resultImage = document.getElementById('result-image');
    const downloadBtn = document.getElementById('download-btn');
    const fileName = document.getElementById('file-name');

    const preProcessArea = document.getElementById('pre-process-area');
    const previewImage = document.getElementById('preview-image');
    const processBtn = document.getElementById('process-btn');
    
    let currentFile = null;

    // Mencegah perilaku default browser saat drag & drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Menambahkan efek visual saat drag
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('dragover');
        });
    });

    // Menangani drop gambar
    uploadArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            handleFileSelection(files[0]);
        }
    });

    // Menangani klik unggah
    imageUpload.addEventListener('change', function() {
        if (this.files.length > 0) {
            handleFileSelection(this.files[0]);
        }
    });

    function handleFileSelection(file) {
        if (!file.type.startsWith('image/')) {
            alert('Mohon pilih file gambar yang valid.');
            return;
        }

        currentFile = file;
        fileName.textContent = file.name;
        
        // Atur UI untuk menampilkan area preview
        uploadArea.style.display = 'none';
        processing.style.display = 'none';
        resultArea.style.display = 'none';
        preProcessArea.style.display = 'block';

        // Tampilkan gambar asli di preview dan kotak hasil perbandingan
        const objectUrl = URL.createObjectURL(file);
        previewImage.src = objectUrl;
        originalImage.src = objectUrl;
    }

    // Menangani klik tombol proses
    processBtn.addEventListener('click', async () => {
        if (!currentFile) return;

        // Atur UI untuk loading
        preProcessArea.style.display = 'none';
        processing.style.display = 'block';

        try {
            // Konfigurasi untuk library imgly background removal
            const config = {
                progress: (key, current, total) => {
                    console.log(`Downloading model ${key}: ${current} of ${total}`);
                }
            };

            // Memanggil fungsi untuk menghapus background
            const imageBlob = await removeBackground(currentFile, config);
            
            // Membuat URL untuk hasil gambar transparan
            const url = URL.createObjectURL(imageBlob);
            resultImage.src = url;
            
            // Atur tombol download
            downloadBtn.href = url;
            const nameWithoutExt = currentFile.name.replace(/\.[^/.]+$/, "");
            downloadBtn.download = `${nameWithoutExt}-transparan.png`;

            // Update UI ke hasil akhir
            processing.style.display = 'none';
            resultArea.style.display = 'block';
        } catch (error) {
            console.error('Error removing background:', error);
            alert('Terjadi kesalahan: ' + (error.message || error));
            preProcessArea.style.display = 'block';
            processing.style.display = 'none';
        }
    });
