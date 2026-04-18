document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. โหลด Header และทำ Logo Animation + Menu Active ---
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('heads.html')
            .then(res => res.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                const header = document.querySelector('.main-header');
                const logo = document.querySelector('.logo');

                // --- ส่วนขีดเส้นใต้เมนู (Active Link) ---
                const currentPath = window.location.pathname.split("/").pop() || 'index.html';
                const menuLinks = document.querySelectorAll('.menu-item');
                menuLinks.forEach(link => {
                    const linkPath = link.getAttribute('href');
                    if (currentPath === linkPath) {
                        link.classList.add('active');
                    }
                });

                // --- ส่วน Animation โลโก้วิ่ง ---
                if (logo) {
                    logo.classList.add('logo-intro-active');
                    setTimeout(() => {
                        logo.classList.remove('logo-intro-active');
                        if (header) header.classList.add('header-visible');
                        
                        // หลังจากโลโก้เข้าที่ ให้ตัวหนังสือ Hero โผล่มา
                        const heroContent = document.querySelector('.hero-content');
                        if (heroContent) {
                            heroContent.style.transition = "all 1.5s cubic-bezier(0.2, 1, 0.3, 1)";
                            heroContent.style.opacity = "1";
                            heroContent.style.transform = "translateY(0)";
                        }
                    }, 1000);
                }
            })
            .catch(err => console.error("Error loading header:", err));
    }

    // --- 2. โหลด Footer ---
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(res => res.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(err => console.error("Error loading footer:", err));
    }

    // --- 3. รวมฟังก์ชัน Scroll (ทำครั้งเดียวเพื่อประสิทธิภาพ) ---
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        
        // A. เปลี่ยนสี Header เมื่อเลื่อนลง
        const header = document.querySelector('.main-header');
        if (header) {
            if (scrollValue > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // B. เอฟเฟกต์ตัวหนังสือ Hero ลอยหาย (Index Page)
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            if (scrollValue > 0) {
                heroContent.style.transition = "none"; 
                heroContent.style.opacity = 1 - (scrollValue / 500);
                heroContent.style.transform = `translateY(-${scrollValue * 0.7}px)`;
            } else {
                heroContent.style.opacity = "1";
                heroContent.style.transform = "translateY(0)";
            }
        }
    });

    // --- 4. ฟังก์ชันสลับรูปพื้นหลัง (เอาคอมเมนต์ออกถ้าต้องการใช้) ---
    /*
    let images = ['slideshow/img1.png', 'slideshow/img2.png'];
    let currentIndex = 0;
    const heroSection = document.getElementById('main-hero-section');
    if (heroSection) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            heroSection.style.backgroundImage = `url('${images[currentIndex]}')`;
        }, 5000);
    }
    */
    // เพิ่มฟังก์ชันนี้ลงใน DOMContentLoaded ที่เราทำไว้
    const images = [
        'slideshow/img1.jpg', 
        'slideshow/img2.jpg'
        //'slideshow/img3.jpg'
    ];
    let currentIndex = 0;
    const slideshowBg = document.getElementById('slideshow-bg');

    function changeBackground() {
        if (slideshowBg && images.length > 0) {
            slideshowBg.style.backgroundImage = `url('${images[currentIndex]}')`;
            currentIndex = (currentIndex + 1) % images.length;
        }
    }

    // สั่งเริ่มทำงาน
    changeBackground();
    setInterval(changeBackground, 5000); // เปลี่ยนรูปทุก 5 วินาที
});
// ฟังก์ชันสำหรับกรองรูปภาพในหน้า Gallery
function filterGallery(category, event) {
    const items = document.querySelectorAll('.gallery-item');
    const btns = document.querySelectorAll('.tab-btn');

    // 1. เปลี่ยนสถานะปุ่ม (Active Class)
    btns.forEach(btn => btn.classList.remove('active'));
    
    // ตรวจสอบว่ามี event ส่งมาหรือไม่ (ป้องกัน Error ในบาง Browser)
    if (event) {
        event.currentTarget.classList.add('active');
    }

    // 2. กรองรูปภาพพร้อมเอฟเฟกต์ Fade
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            // ใช้ความล่าช้านิดหน่อยเพื่อให้ CSS Transition ทำงาน (Opacity)
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300); // รอให้ Animation จางหายเสร็จก่อนค่อยซ่อน
        }
    });
}
