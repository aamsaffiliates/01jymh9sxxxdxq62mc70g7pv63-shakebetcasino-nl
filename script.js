// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section)
})

// Mobile menu toggle
const mobileMenuBtn = document.createElement("button")
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
mobileMenuBtn.className = "md:hidden text-casino-yellow text-2xl"
mobileMenuBtn.addEventListener("click", () => {
  const nav = document.querySelector("nav div:nth-child(2)")
  nav.classList.toggle("hidden")
  nav.classList.toggle("flex")
  nav.classList.toggle("flex-col")
  nav.classList.toggle("absolute")
  nav.classList.toggle("top-full")
  nav.classList.toggle("left-0")
  nav.classList.toggle("right-0")
  nav.classList.toggle("bg-casino-black")
  nav.classList.toggle("border-t-2")
  nav.classList.toggle("border-casino-yellow")
  nav.classList.toggle("p-4")
})

// Insert mobile menu button
const nav = document.querySelector("nav")
nav.insertBefore(mobileMenuBtn, nav.children[2])

// FAQ toggle functionality
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling
    const isOpen = answer.style.display === "block"

    // Close all other answers
    document.querySelectorAll(".faq-answer").forEach((ans) => {
      ans.style.display = "none"
    })

    // Toggle current answer
    answer.style.display = isOpen ? "none" : "block"
  })
})

// Initialize FAQ - hide all answers
document.querySelectorAll(".faq-answer").forEach((answer) => {
  answer.style.display = "none"
})

// Add loading animation to page
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease-in-out"
  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-element")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Add click handlers for all CTA buttons
document.querySelectorAll(".cta-button, .cta-button-large, .cta-button-secondary, .play-btn").forEach((button) => {
  if (!button.onclick) {
    button.addEventListener("click", () => {
      window.location.href = "/register"
    })
  }
})

// Add hover sound effects (optional)
const playHoverSound = () => {
  // You can add audio here if needed
  // const audio = new Audio('hover-sound.mp3');
  // audio.play();
}

document.querySelectorAll(".cta-button, .game-card, .step-card").forEach((element) => {
  element.addEventListener("mouseenter", playHoverSound)
})

// Calendar day click handlers
document.querySelectorAll(".calendar-day").forEach((day) => {
  day.addEventListener("click", () => {
    alert(`Claim je ${day.querySelector(".day-promo").textContent} bonus! Registreer nu om deze aanbieding te claimen.`)
  })
})

// Add explosion effect on button clicks
function createExplosion(x, y) {
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement("div")
    particle.style.position = "fixed"
    particle.style.left = x + "px"
    particle.style.top = y + "px"
    particle.style.width = "4px"
    particle.style.height = "4px"
    particle.style.background = "#fff201"
    particle.style.pointerEvents = "none"
    particle.style.zIndex = "9999"

    document.body.appendChild(particle)

    const angle = (i / 10) * Math.PI * 2
    const velocity = 100 + Math.random() * 100

    particle.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    ).onfinish = () => {
      particle.remove()
    }
  }
}

// Add explosion effect to CTA buttons
document.querySelectorAll(".cta-button-large").forEach((button) => {
  button.addEventListener("click", (e) => {
    const rect = button.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    createExplosion(x, y)
  })
})

console.log("🎰 Shakebet Casino loaded successfully! 🎰")
