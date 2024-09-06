
// script.js
window.addEventListener('load', function() {
  // GSAP animation for hiding the loading page and showing the container
 
  gsap.to(".loading-page", {
    onComplete: function() {
      document.getElementsByClassName('.container').style.display = 'none';
    },
    opacity: 0,
    duration: 1.5,
    delay: 2, // Adjust delay if needed
    onComplete: function() {
      document.querySelector('.loading-page').style.display = 'none';
      gsap.to(".container", {
        opacity: 1,
        visibility: 'visible',
        duration: 1.5
      });
      gsap.to(".fixed", {
        opacity: 1,
        visibility: 'visible',
        duration: 1.5
      });
    }
  });

  // GSAP animation for showing the logo name
  gsap.fromTo(
    ".logo-name",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 2,
      delay: 0.5,
    }
  );
});


const canvas = document.getElementById("technology-network");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Initial resize

const points = [];
const numPoints = 210;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize points
for (let i = 0; i < numPoints; i++) {
  points.push({
    x: getRandomInt(0, canvas.width),
    y: getRandomInt(0, canvas.height),
    radius: getRandomInt(2, 4),
    dx: getRandomInt(-1, 1),
    dy: getRandomInt(-1, 1),
  });
}

// Draw the network
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];

    // Move points
    p1.x += p1.dx;
    p1.y += p1.dy;

    // Bounce off edges
    if (p1.x <= 0 || p1.x >= canvas.width) p1.dx *= -1;
    if (p1.y <= 0 || p1.y >= canvas.height) p1.dy *= -1;

    // Draw point
    ctx.beginPath();
    ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(128, 128, 128, 0.7)"; // Gray color for points
    ctx.fill();
    ctx.closePath();

    // Draw lines between points
    for (let j = i + 1; j < points.length; j++) {
      const p2 = points[j];
      const distance = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      if (distance < 200) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(128, 128, 128, 0.3)"; // Gray color for lines
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();
// const prevButton = document.querySelector(".prev");
// const nextButton = document.querySelector(".next");
const img = document.querySelector(".profile-image img");

let index = 0;
const images = [
  "image/avarta4.png",
  "image/avarta2.png", // Thêm các đường dẫn hình ảnh khác vào đây
];

function updateImage() {
  img.src = images[index];
}

function showNextImage() {
  index = index < images.length - 1 ? index + 1 : 0;
  updateImage();
}

// Chạy tự động mỗi 3 giây (3000 milliseconds)
const autoSlide = setInterval(showNextImage, 3000);

prevButton.addEventListener("click", () => {
  index = index > 0 ? index - 1 : images.length - 1;
  updateImage();
  // Reset tự động chuyển đổi khi người dùng nhấn nút
  clearInterval(autoSlide);
  autoSlide = setInterval(showNextImage, 3000);
});

nextButton.addEventListener("click", () => {
  index = index < images.length - 1 ? index + 1 : 0;
  updateImage();
  // Reset tự động chuyển đổi khi người dùng nhấn nút
  clearInterval(autoSlide);
  autoSlide = setInterval(showNextImage, 3000);
});
