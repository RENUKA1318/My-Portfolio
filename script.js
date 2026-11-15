/* =========================
   MOBILE MENU
========================= */

const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("navbar");

menuIcon.addEventListener("click", () => {

    navbar.classList.toggle("active");

    const icon = menuIcon.querySelector("i");

    if (navbar.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* =========================
   CLOSE MOBILE MENU
========================= */

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuIcon.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


/* =========================
   BACK TO TOP
========================= */

const topButton = document.getElementById("top-button");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        topButton.classList.add("show");
    } else {
        topButton.classList.remove("show");
    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   CONTACT FORM
========================= */


const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = {
            name: document.querySelector("#name").value,
            email: document.querySelector("#email").value,
            subject: document.querySelector("#subject").value,
            message: document.querySelector("#message").value
        };

        try {
            const response = await fetch(
                "http://localhost:5000/api/contacts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const result = await response.json();

            if (response.ok) {
                alert("Message sent successfully!");
                contactForm.reset();
            } else {
                alert(result.message || "Failed to send message");
            }

        } catch (error) {
            console.error("Contact form error:", error);
            alert("Unable to connect to the server");
        }
    });
}



/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, .certificate-card, .timeline-item, .experience-card"
);

const revealOnScroll = () => {

    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 80) {

            element.style.opacity = "1";
            element.style.transform = "translateY(0)";

        }

    });

};


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "0.7s ease";

});


window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
// ===== PORTFOLIO SPARKLE EFFECT =====

document.addEventListener("DOMContentLoaded", () => {

    const sparkleContainer = document.createElement("div");
    sparkleContainer.id = "sparkle-container";
    document.body.appendChild(sparkleContainer);

    function createSparkle() {
        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";
        sparkle.innerHTML = "✦";

        sparkle.style.left = Math.random() * 100 + "vw";
        sparkle.style.top = Math.random() * 100 + "vh";
        sparkle.style.animationDuration = (1 + Math.random() * 2) + "s";
        sparkle.style.fontSize = (8 + Math.random() * 15) + "px";

        sparkleContainer.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }

    for (let i = 0; i < 35; i++) {
        setTimeout(createSparkle, i * 80);
    }

    setInterval(createSparkle, 180);
});
