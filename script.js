// Bouquet interaction
const bouquet = document.getElementById("bouquet")
const messageCard = document.getElementById("messageCard")

bouquet.addEventListener("click", () => {
  messageCard.classList.toggle("active")
})

// Scratch card functionality
function initScratchCard(canvas) {
  const ctx = canvas.getContext("2d")
  const container = canvas.parentElement
  const rect = container.getBoundingClientRect()
  
  // Set canvas size
  canvas.width = rect.width
  canvas.height = rect.height
  
  // Create scratch overlay
  ctx.fillStyle = "#f4a8c4"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // Add text
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
  ctx.font = "20px Poppins, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("Scratch here", canvas.width / 2, canvas.height / 2 - 10)
  ctx.font = "16px Poppins, sans-serif"
  ctx.fillText("to reveal", canvas.width / 2, canvas.height / 2 + 15)
  
  // Add sparkle effect
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const size = Math.random() * 3 + 1
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }
  
  let isScratching = false
  let scratchedPercentage = 0
  
  function scratch(x, y) {
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x, y, 25, 0, Math.PI * 2)
    ctx.fill()
  }
  
  function getPosition(e) {
    const rect = canvas.getBoundingClientRect()
    const touch = e.touches ? e.touches[0] : e
    return {
      x: (touch.clientX - rect.left) * (canvas.width / rect.width),
      y: (touch.clientY - rect.top) * (canvas.height / rect.height)
    }
  }
  
  function checkScratchPercentage() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparent = 0
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++
    }
    
    scratchedPercentage = (transparent / (pixels.length / 4)) * 100
    
    if (scratchedPercentage > 50) {
      canvas.style.transition = "opacity 0.5s ease"
      canvas.style.opacity = "0"
      setTimeout(() => {
        canvas.style.display = "none"
      }, 500)
    }
  }
  
  // Mouse events
  canvas.addEventListener("mousedown", (e) => {
    isScratching = true
    const pos = getPosition(e)
    scratch(pos.x, pos.y)
  })
  
  canvas.addEventListener("mousemove", (e) => {
    if (isScratching) {
      const pos = getPosition(e)
      scratch(pos.x, pos.y)
    }
  })
  
  canvas.addEventListener("mouseup", () => {
    isScratching = false
    checkScratchPercentage()
  })
  
  canvas.addEventListener("mouseleave", () => {
    isScratching = false
  })
  
  // Touch events
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault()
    isScratching = true
    const pos = getPosition(e)
    scratch(pos.x, pos.y)
  })
  
  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault()
    if (isScratching) {
      const pos = getPosition(e)
      scratch(pos.x, pos.y)
    }
  })
  
  canvas.addEventListener("touchend", () => {
    isScratching = false
    checkScratchPercentage()
  })
}

// Initialize all scratch cards
document.querySelectorAll(".scratch-canvas").forEach(canvas => {
  initScratchCard(canvas)
})

// Reinitialize on window resize
let resizeTimer
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    document.querySelectorAll(".scratch-canvas").forEach(canvas => {
      if (canvas.style.display !== "none") {
        initScratchCard(canvas)
      }
    })
  }, 250)
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
