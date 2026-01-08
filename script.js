// Bouquet interaction
const bouquet = document.getElementById("bouquet")
const messageCard = document.getElementById("messageCard")

bouquet.addEventListener("click", () => {
  messageCard.classList.toggle("active")
})

// Navigation dots
const dots = document.querySelectorAll(".dot")
const container = document.querySelector(".container")
const sections = document.querySelectorAll(".section")

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const sectionNumber = index + 1
    const section = document.getElementById(`section-${sectionNumber}`)
    section.scrollIntoView({ behavior: "smooth" })
  })
})

// Update active dot on scroll
container.addEventListener("scroll", () => {
  let current = 0

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    const scrollPosition = container.scrollTop

    if (scrollPosition >= sectionTop - sectionHeight / 3) {
      current = index
    }
  })

  dots.forEach((dot, index) => {
    dot.classList.remove("active")
    if (index === current) {
      dot.classList.add("active")
    }
  })
})

// Initialize first dot as active
dots[0].classList.add("active")

// Prevent body scroll (mobile optimization)
document.body.style.overflow = "hidden"

// Allow customization of messages
function updateBouquetMessage(newMessage) {
  document.getElementById("messageText").textContent = newMessage
}

function updateMemoryText(newText) {
  document.getElementById("memoryText").textContent = newText
}

// Example: Uncomment to customize messages
// updateBouquetMessage("Your custom message here");
// updateMemoryText("Your custom memory text here");
