document.addEventListener("DOMContentLoaded", () => {

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

    function closeMenu() {
        isOpen = false;
        mobileMenu?.classList.remove("open");
        overlay?.classList.remove("active");
        menuBtn?.classList.remove("active");
        document.body.style.overflow = "";
    }

    menuBtn?.addEventListener("click", () => {
        isOpen = !isOpen;

        mobileMenu?.classList.toggle("open");
        overlay?.classList.toggle("active");
        menuBtn?.classList.toggle("active");

        document.body.style.overflow = isOpen ? "hidden" : "";
    });

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

    window.matchMedia("(min-width: 992px)")
        .addEventListener("change", (e) => {
            if (e.matches) closeMenu();
        });

    const aboutSection = document.getElementById("about");

    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target
                        .querySelectorAll(".reveal-left, .reveal-right")
                        .forEach(el => el.classList.add("revealed"));
                }
            });
        }, { threshold: 0.15 });

        observer.observe(aboutSection);
    }

    const counters = document.querySelectorAll("[data-target]");
    let started = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target")) || 0;
            let count = 0;

            function update() {
                const increment = target / 100;
                count += increment;

                if (count < target) {
                    counter.innerText = Math.floor(count);
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target;
                }
            }

            update();
        });
    }

    window.addEventListener("scroll", () => {
        const section = document.getElementById("counters");

        if (!started && section && section.getBoundingClientRect().top < window.innerHeight) {
            runCounters();
            started = true;
        }
    });

    const form = document.getElementById("contactForm");
    const successBox = document.getElementById("success");

    if (!form) return;

    const rules = {
        name: /^[\u0600-\u06FFa-zA-Z\s]{3,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^(\+?\d{9,15})$/
    };

    function getError(input) {
        return input.parentElement?.querySelector(".error-msg");
    }

    function showError(input, message) {
        const error = getError(input);
        if (!error) return;

        error.textContent = message;
        error.classList.remove("d-none");
    }

    function clearError(input) {
        const error = getError(input);
        if (!error) return;

        error.textContent = "";
        error.classList.add("d-none");
    }

    function validateField(input) {
        const value = input.value.trim();

        if (!value && input.tagName !== "SELECT") {
            showError(input, "هذا الحقل مطلوب");
            return false;
        }

        // select check
        if (input.tagName === "SELECT" && !value) {
            showError(input, "اختر القطاع");
            return false;
        }

        if (input.name === "name" && !rules.name.test(value)) {
            showError(input, "الاسم يجب أن يكون 3 حروف على الأقل");
            return false;
        }

        if (input.name === "email" && !rules.email.test(value)) {
            showError(input, "البريد الإلكتروني غير صحيح");
            return false;
        }

        if (input.name === "phone" && value && !rules.phone.test(value)) {
            showError(input, "رقم الهاتف غير صحيح");
            return false;
        }

        clearError(input);
        return true;
    }

    function validateForm() {
        let isValid = true;

        form.querySelectorAll("input, textarea, select").forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function getValue(name) {
        return form.querySelector(`[name="${name}"]`)?.value.trim() || "";
    }

    /* ================= BUILD WHATSAPP MESSAGE ================= */
    function buildMessage() {
        return `📩 طلب جديد من الموقع:
👤 الاسم: ${getValue("name")}
🏢 الشركة: ${getValue("company")}
📧 البريد: ${getValue("email")}
📞 الهاتف: ${getValue("phone")}
🏭 القطاع: ${getValue("sector")}
💬 الرسالة: ${getValue("message")}`;
    }

    /* ================= SUBMIT ================= */
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const phoneNumber = "966560216521";
        const text = encodeURIComponent(buildMessage());

        window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");

        form.classList.add("d-none");
        successBox?.classList.remove("d-none");

        setTimeout(() => {
            form.reset();
            form.classList.remove("d-none");
            successBox?.classList.add("d-none");
        }, 5000);
    });



if (typeof Swiper !== "undefined") {
    new Swiper(".heroSwiper", {
        effect: "fade",
        fadeEffect: { crossFade: true },
        loop: true,
        speed: 3000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        }
    });
}

if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 1000,
        once: false,
        offset: 100
    });
}

});