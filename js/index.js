window.addEventListener("load", () => {
    document.querySelectorAll(".hero-content > *").forEach((el, i) => {
        el.style.opacity = 0;
        el.style.transform = "translateY(20px)";

        setTimeout(() => {
            el.style.transition = "0.6s";
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }, i * 200);
    });
});



const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");
const navbar = document.getElementById("navbar");

let isOpen = false;



if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        isOpen = !isOpen;

        mobileMenu?.classList.toggle("open");
        overlay?.classList.toggle("active");
        menuBtn.classList.toggle("active");

        document.body.style.overflow = isOpen ? "hidden" : "";
    });
}



function closeMenu() {
    isOpen = false;

    mobileMenu?.classList.remove("open");
    overlay?.classList.remove("active");
    menuBtn?.classList.remove("active");

    document.body.style.overflow = "";
}



overlay?.addEventListener("click", closeMenu);



document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", closeMenu);
});


window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


const mediaQuery = window.matchMedia("(min-width: 992px)");

mediaQuery.addEventListener("change", (e) => {
    if (e.matches) closeMenu();
});



const aboutSection = document.getElementById("about");

if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target
                    .querySelectorAll(".reveal-left, .reveal-right")
                    .forEach(el => el.classList.add("revealed"));
            }
        });
    }, { threshold: 0.15 });

    aboutObserver.observe(aboutSection);
}




const counters = document.querySelectorAll("[data-target]");

function runCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;

        const update = () => {
            const increment = target / 100;

            count += increment;

            if (count < target) {
                counter.innerText = Math.floor(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };

        update();
    });
}

let started = false;
window.addEventListener("scroll", () => {
    const section = document.getElementById("counters");

    if (!started && section.getBoundingClientRect().top < window.innerHeight) {
        runCounters();
        started = true;
    }
});

const form = document.getElementById("contactForm");
const successBox = document.getElementById("success");

const rules = {
    name: /^[\u0600-\u06FFa-zA-Z\s]{3,}$/, // Arabic/English name
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^(\+?\d{9,15})$/, // international format
};

const inputs = form.querySelectorAll("input, textarea, select");

function showError(input, message) {
    let error = input.parentElement.querySelector(".error-msg");

    if (!error) {
        error = document.createElement("small");
        error.className = "text-danger error-msg";
        input.parentElement.appendChild(error);
    }

    error.textContent = message;
    error.classList.remove("d-none");
}

function clearError(input) {
    const error = input.parentElement.querySelector(".error-msg");
    if (error) {
        error.textContent = "";
        error.classList.add("d-none");
    }
}

function validateField(input) {
    const value = input.value.trim();
    const name = input.previousElementSibling?.textContent || input.name;

    // required check
    if (!value && input.tagName !== "SELECT") {
        showError(input, "هذا الحقل مطلوب");
        return false;
    }

    if (input.tagName === "SELECT" && !input.value) {
        showError(input, "اختر القطاع");
        return false;
    }

    if (input.type === "text" && input.name === "name") {
        if (!rules.name.test(value)) {
            showError(input, "الاسم يجب أن يكون 3 حروف على الأقل");
            return false;
        }
    }

    if (input.type === "email") {
        if (!rules.email.test(value)) {
            showError(input, "البريد الإلكتروني غير صحيح");
            return false;
        }
    }

    if (input.type === "tel" && value) {
        if (!rules.phone.test(value)) {
            showError(input, "رقم الهاتف غير صحيح");
            return false;
        }
    }

    clearError(input);
    return true;
}

function validateForm() {
    let valid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            valid = false;
        }
    });

    return valid;
}

function buildMessage() {
    const name = form.querySelector('input[type="text"]').value;
    const company = form.querySelectorAll('input[type="text"]')[1].value;
    const email = form.querySelector('input[type="email"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const sector = form.querySelector("select").value;
    const message = form.querySelector("textarea").value;

    return `
📩 طلب جديد من الموقع:

👤 الاسم: ${name}
🏢 الشركة: ${company}
📧 البريد: ${email}
📞 الهاتف: ${phone}
🏭 القطاع: ${sector}
💬 الرسالة: ${message}
  `;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const text = encodeURIComponent(buildMessage());
    const phoneNumber = "966560216521";

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;

    window.open(whatsappURL, "_blank");

    form.classList.add("d-none");
    successBox.classList.remove("d-none");

    setTimeout(() => {
        successBox.classList.add("d-none");
        form.classList.remove("d-none");
        form.reset();
    }, 6000);
});
const swiper = new Swiper(".testimonialsSwiper", {
    autoHeight: false,
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
    },
});