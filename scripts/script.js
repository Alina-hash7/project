// 1. Адаптивное меню (гамбургер-меню)
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

// 4. Слайдер отзывов
const reviews = document.querySelectorAll('.review');
const prevButton = document.getElementById('prev-review');
const nextButton = document.getElementById('next-review');
let currentReviewIndex = 0;

function showReview(index) {
    reviews.forEach((review, i) => {
        review.classList.remove('active');
        if (i === index) {
            review.classList.add('active');
        }
    });
}

nextButton.addEventListener('click', () => {
    currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
    showReview(currentReviewIndex);
});

prevButton.addEventListener('click', () => {
    currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
    showReview(currentReviewIndex);
});

// 5. Обработка формы обратной связи
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    console.log('Данные формы:', data);
    alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    contactForm.reset();
});


// Функция для показа или скрытия подробностей курса
function toggleDetails(courseId) {
    const details = document.getElementById(courseId);
    
    // Если описание скрыто, показываем его с анимацией
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block"; // Показываем
        setTimeout(() => {
            details.classList.add('show'); // Добавляем анимацию появления
        }, 10);
    } else {
        details.classList.remove('show'); // Убираем анимацию исчезновения
        setTimeout(() => {
            details.style.display = "none"; // Скрываем после анимации
        }, 300); // Даем время на анимацию
    }
}
