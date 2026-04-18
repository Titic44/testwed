//document.addEventListener('DOMContentLoaded', function() {
//    const galleryContainer = document.getElementById('fullmetal-gallery');
//    const totalImages = 10; // ระบุจำนวนรูปภาพทั้งหมดที่คุณมีในโฟลเดอร์
//    const folderPath = 'products/fullmetal/';
//
//    for (let i = 1; i <= totalImages; i++) {
//        const itemHtml = `
//            <div class="album-item">
//                <div class="album-card">
//                    <img src="${folderPath}${i}.jpg" alt="Full Metal Case ${i}" onerror="this.parentElement.parentElement.style.display='none'">
//                    <div class="album-overlay">
//                        <i class="fas fa-search-plus"></i>
//                        <p>คลิกขยาย</p>
//                    </div>
//                </div>
//            </div>
//        `;
//        galleryContainer.innerHTML += itemHtml;
//    }
//});

document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('fullmetal-gallery');
    const folderPath = 'products/fullmetal/';
    const maxPossibleImages = 50; // ตั้งเผื่อไว้เยอะๆ ได้เลย เช่น 50 หรือ 100

    for (let i = 1; i <= maxPossibleImages; i++) {
        const itemHtml = `
            <div class="album-item">
                <div class="album-card">
                    <img src="${folderPath}${i}.jpg" 
                         alt="Full Metal ${i}" 
                         onerror="this.closest('.album-item').remove()">
                    <div class="album-overlay">
                        <i class="fas fa-search-plus"></i>
                        <p>คลิกขยาย</p>
                    </div>
                </div>
            </div>
        `;
        galleryContainer.innerHTML += itemHtml;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-album-grid');
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close-modal");

    // --- ส่วนที่ 1: ตรวจจับการคลิกที่รูปภาพ (Event Delegation) ---
    // ใช้เทคนิคนี้เพื่อให้รูปที่โหลดมาใหม่จากการวน Loop สามารถคลิกได้ด้วย
    if (galleryGrid) {
        galleryGrid.addEventListener('click', function(e) {
            // เช็คว่าสิ่งที่คลิกคือรูปภาพ หรือ Overlay หรือไอคอนแว่นขยาย
            const clickedCard = e.target.closest('.album-card');
            
            if (clickedCard) {
                const img = clickedCard.querySelector('img');
                const title = clickedCard.parentElement.querySelector('h4');

                if (img) {
                    modal.style.display = "block";
                    modalImg.src = img.src;
                    captionText.innerHTML = title ? title.innerText : img.alt;
                    
                    // ป้องกันการเลื่อนหน้าจอขณะเปิดรูป
                    document.body.style.overflow = "hidden";
                }
            }
        });
    }

    // --- ส่วนที่ 2: การปิด Modal ---
    
    // กดปุ่ม X เพื่อปิด
    if (closeBtn) {
        closeBtn.onclick = function() {
            closeLightbox();
        }
    }

    // คลิกพื้นที่ว่างสีดำเพื่อปิด
    window.onclick = function(event) {
        if (event.target == modal) {
            closeLightbox();
        }
    }

    function closeLightbox() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // คืนค่าการเลื่อนหน้าจอ
    }
});

let currentImgIndex = 0;
let allGalleryImages = [];

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    const captionText = document.getElementById("caption");
    const galleryGrid = document.querySelector('.gallery-album-grid');

    // 1. เก็บรายชื่อรูปภาพทั้งหมดในอัลบั้มไว้ใน Array
    function updateImageList() {
        allGalleryImages = Array.from(document.querySelectorAll('.album-card img'));
    }

    // 2. ฟังก์ชันเปิด Modal
    if (galleryGrid) {
        galleryGrid.addEventListener('click', function(e) {
            const clickedCard = e.target.closest('.album-card');
            if (clickedCard) {
                updateImageList(); // อัปเดตลิสต์รูปเผื่อมีการเพิ่ม/ลด
                const img = clickedCard.querySelector('img');
                currentImgIndex = allGalleryImages.indexOf(img);
                showImage(currentImgIndex);
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
            }
        });
    }

    // 3. ฟังก์ชันแสดงรูปตาม Index
    window.showImage = function(index) {
        if (index >= allGalleryImages.length) { currentImgIndex = 0; }
        else if (index < 0) { currentImgIndex = allGalleryImages.length - 1; }
        else { currentImgIndex = index; }

        const targetImg = allGalleryImages[currentImgIndex];
        const title = targetImg.closest('.album-item').querySelector('h4');
        
        modalImg.src = targetImg.src;
        captionText.innerHTML = title ? title.innerText : targetImg.alt;
    }

    // 4. ฟังก์ชันเปลี่ยนรูป (Next/Prev)
    window.changeImage = function(n) {
        showImage(currentImgIndex + n);
    }

    // 5. ปิด Modal
    window.closeLightbox = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    document.querySelector(".close-modal").onclick = closeLightbox;
    
    window.onclick = function(event) {
        if (event.target == modal) { closeLightbox(); }
    }

    // 6. รองรับการกดลูกศรบน คีย์บอร์ด
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === "block") {
            if (e.key === "ArrowLeft") changeImage(-1);
            if (e.key === "ArrowRight") changeImage(1);
            if (e.key === "Escape") closeLightbox();
        }
    });
});

//----------------PFM---------------
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('porcelainfusedtometal-gallery');
    const folderPath = 'products/porcelainfusedtometal/';
    const maxPossibleImages = 50; // ตั้งเผื่อไว้เยอะๆ ได้เลย เช่น 50 หรือ 100

    for (let i = 1; i <= maxPossibleImages; i++) {
        const itemHtml = `
            <div class="album-item">
                <div class="album-card">
                    <img src="${folderPath}${i}.jpg" 
                         alt="Full Metal ${i}" 
                         onerror="this.closest('.album-item').remove()">
                    <div class="album-overlay">
                        <i class="fas fa-search-plus"></i>
                        <p>คลิกขยาย</p>
                    </div>
                </div>
            </div>
        `;
        galleryContainer.innerHTML += itemHtml;
    }
});

//----------------RPD---------------
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('removablepartialdenture(rpd)-gallery');
    const folderPath = 'products/removablepartialdenture(rpd)/';
    const maxPossibleImages = 50; // ตั้งเผื่อไว้เยอะๆ ได้เลย เช่น 50 หรือ 100

    for (let i = 1; i <= maxPossibleImages; i++) {
        const itemHtml = `
            <div class="album-item">
                <div class="album-card">
                    <img src="${folderPath}${i}.jpg" 
                         alt="Full Metal ${i}" 
                         onerror="this.closest('.album-item').remove()">
                    <div class="album-overlay">
                        <i class="fas fa-search-plus"></i>
                        <p>คลิกขยาย</p>
                    </div>
                </div>
            </div>
        `;
        galleryContainer.innerHTML += itemHtml;
    }
});

//----------------Retainer---------------
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('retainer-gallery');
    const folderPath = 'products/retainer/';
    const maxPossibleImages = 50; // ตั้งเผื่อไว้เยอะๆ ได้เลย เช่น 50 หรือ 100

    for (let i = 1; i <= maxPossibleImages; i++) {
        const itemHtml = `
            <div class="album-item">
                <div class="album-card">
                    <img src="${folderPath}${i}.jpg" 
                         alt="Full Metal ${i}" 
                         onerror="this.closest('.album-item').remove()">
                    <div class="album-overlay">
                        <i class="fas fa-search-plus"></i>
                        <p>คลิกขยาย</p>
                    </div>
                </div>
            </div>
        `;
        galleryContainer.innerHTML += itemHtml;
    }
});

//----------------temporaryplate(tp)---------------
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('temporaryplate(tp)-gallery');
    const folderPath = 'products/temporaryplate(tp)/';
    const maxPossibleImages = 50; // ตั้งเผื่อไว้เยอะๆ ได้เลย เช่น 50 หรือ 100

    for (let i = 1; i <= maxPossibleImages; i++) {
        const itemHtml = `
            <div class="album-item">
                <div class="album-card">
                    <img src="${folderPath}${i}.jpg" 
                         alt="Full Metal ${i}" 
                         onerror="this.closest('.album-item').remove()">
                    <div class="album-overlay">
                        <i class="fas fa-search-plus"></i>
                        <p>คลิกขยาย</p>
                    </div>
                </div>
            </div>
        `;
        galleryContainer.innerHTML += itemHtml;
    }
});

//----------------veneer---------------
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('veneer-gallery');
    const folderPath = 'products/veneer/';
    const maxPossibleImages = 50; // ตั้งเผื่อไว้เยอะๆ ได้เลย เช่น 50 หรือ 100

    for (let i = 1; i <= maxPossibleImages; i++) {
        const itemHtml = `
            <div class="album-item">
                <div class="album-card">
                    <img src="${folderPath}${i}.jpg" 
                         alt="Full Metal ${i}" 
                         onerror="this.closest('.album-item').remove()">
                    <div class="album-overlay">
                        <i class="fas fa-search-plus"></i>
                        <p>คลิกขยาย</p>
                    </div>
                </div>
            </div>
        `;
        galleryContainer.innerHTML += itemHtml;
    }
});

//----------------multiplus---------------
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('multiplus-gallery');
    const folderPath = 'products/multiplus/';
    const maxPossibleImages = 50; // ตั้งเผื่อไว้เยอะๆ ได้เลย เช่น 50 หรือ 100

    for (let i = 1; i <= maxPossibleImages; i++) {
        const itemHtml = `
            <div class="album-item">
                <div class="album-card">
                    <img src="${folderPath}${i}.jpg" 
                         alt="Full Metal ${i}" 
                         onerror="this.closest('.album-item').remove()">
                    <div class="album-overlay">
                        <i class="fas fa-search-plus"></i>
                        <p>คลิกขยาย</p>
                    </div>
                </div>
            </div>
        `;
        galleryContainer.innerHTML += itemHtml;
    }
});
