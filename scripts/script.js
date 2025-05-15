'use strict';

// 1. Адаптивное меню (гамбургер-меню)
document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт отработал корректно');

    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        menuToggle.textContent = navList.classList.contains('active') ? '✕' : '☰';
    });

    // 2. Плавная прокрутка к секциям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Закрываем меню, если оно открыто (для мобильных устройств)
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    menuToggle.textContent = '☰';
                }
            }
        });
    });

    // 3. Анимация появления секций при прокрутке
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // 4. Swiper-карусель для отзывов
    // Подключи Swiper CSS и JS в HTML!
    if (typeof Swiper !== "undefined") {
        new Swiper('.reviews-swiper', {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    }

    // 5. Обработка формы обратной связи с LocalStorage
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Подставляем значения из LocalStorage
        contactForm.name.value = localStorage.getItem('contactName') || '';
        contactForm.email.value = localStorage.getItem('contactEmail') || '';
        contactForm.message.value = localStorage.getItem('contactMessage') || '';

        // Сохраняем значения при вводе
        contactForm.name.addEventListener('input', e => {
            localStorage.setItem('contactName', e.target.value);
        });
        contactForm.email.addEventListener('input', e => {
            localStorage.setItem('contactEmail', e.target.value);
        });
        contactForm.message.addEventListener('input', e => {
            localStorage.setItem('contactMessage', e.target.value);
        });

        // Очищаем LocalStorage при отправке
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.removeItem('contactName');
            localStorage.removeItem('contactEmail');
            localStorage.removeItem('contactMessage');
            alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
        });
    }

    // 6. Кнопка прокрутки вверх
    let scrollToTopBtn = document.getElementById("scrollTopBtn");
    if (!scrollToTopBtn) {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.id = "scrollTopBtn";
        scrollToTopBtn.textContent = "Наверх";
        scrollToTopBtn.style.position = "fixed";
        scrollToTopBtn.style.bottom = "30px";
        scrollToTopBtn.style.right = "30px";
        scrollToTopBtn.style.display = "none";
        scrollToTopBtn.style.zIndex = "1000";
        scrollToTopBtn.style.padding = "10px 20px";
        scrollToTopBtn.style.background = "#4a90e2";
        scrollToTopBtn.style.color = "#fff";
        scrollToTopBtn.style.border = "none";
        scrollToTopBtn.style.borderRadius = "5px";
        scrollToTopBtn.style.cursor = "pointer";
        document.body.appendChild(scrollToTopBtn);
    }

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 7. Массив заголовков h2 и вывод в консоль
    const headings = Array.from(document.querySelectorAll('h2'));
    const headingsArray = headings.map(h => h.textContent);
    console.log('Заголовки на странице:', headingsArray);

    // 8. Красивый preloader (SpinKit)
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000); // 1 секунда
    }

    // 9. Fetch курсов из data.json и динамический вывод
    fetch('data.json')
        .then(response => response.json())
        .then(coursesData => {
            const courseCardsContainer = document.getElementById('courseCards');
            if (courseCardsContainer) {
                courseCardsContainer.innerHTML = '';
                for (let key in coursesData) {
                    const course = coursesData[key];
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <img src="${course.img}" alt="${course.alt}">
                        <h3>${course.title}</h3>
                        <p>${course.description}</p>
                        <button class="btn btn-secondary" onclick="toggleDetails('${key}')">Подробнее</button>
                        <div class="course-details" id="${key}" style="display:none;">
                            <p>${course.details}</p>
                        </div>
                    `;
                    courseCardsContainer.appendChild(card);
                }
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки курсов:', error);
        });
});

// 10. Функция для показа или скрытия подробностей курса
function toggleDetails(courseId) {
    const details = document.getElementById(courseId);
    if (!details) return;

    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
        setTimeout(() => {
            details.classList.add('show');
        }, 10);
    } else {
        details.classList.remove('show');
        setTimeout(() => {
            details.style.display = "none";
        }, 300);
    }
}