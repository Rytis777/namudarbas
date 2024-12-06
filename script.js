// script.js
const statusElement = document.getElementById('status');
const speedElement = document.getElementById('speed');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
const canvas = document.getElementById('rpmGauge');
const ctx = canvas.getContext('2d');

let isRunning = false;
let speed = 0;
let targetSpeed = 0;

// Funkcija atnaujinti matuoklį
function drawGauge(speed) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.beginPath();
    ctx.arc(150, 150, 100, Math.PI, 0);
    ctx.fillStyle = '#f0f0f0';
    ctx.fill();

    // Gauge ticks
    for (let i = 0; i <= 10; i++) {
        const angle = Math.PI - (i * Math.PI / 10); // Keičiam kryptį
        const x1 = 150 + Math.cos(angle) * 90;
        const y1 = 150 - Math.sin(angle) * 90;
        const x2 = 150 + Math.cos(angle) * 100;
        const y2 = 150 - Math.sin(angle) * 100;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#000';
        ctx.stroke();
    }

    // Needle
    const needleAngle = Math.PI - (speed / 1000) * Math.PI; // Atvirkštinė kryptis
    const needleX = 150 + Math.cos(needleAngle) * 80;
    const needleY = 150 - Math.sin(needleAngle) * 80;
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(needleX, needleY);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.stroke();
}

// Funkcija atnaujinti statusą
function updateStatus() {
    statusElement.textContent = isRunning ? 'Veikia' : 'Išjungtas';
    speedElement.textContent = Math.round(speed);
    increaseBtn.disabled = !isRunning;
    decreaseBtn.disabled = !isRunning;
    stopBtn.disabled = !isRunning;
    startBtn.disabled = isRunning;
}

// Greičio sklandus keitimas
function updateSpeed() {
    if (speed < targetSpeed) {
        speed += Math.min(10, targetSpeed - speed);
    } else if (speed > targetSpeed) {
        speed -= Math.min(10, speed - targetSpeed);
    }
    drawGauge(speed);
    updateStatus();
    requestAnimationFrame(updateSpeed);
}

// Mygtukų funkcionalumas
startBtn.addEventListener('click', () => {
    isRunning = true;
    targetSpeed = 100; // Pradinis greitis
    updateStatus();
});

stopBtn.addEventListener('click', () => {
    isRunning = false;
    targetSpeed = 0;
    updateStatus();
});

increaseBtn.addEventListener('click', () => {
    if (isRunning) {
        targetSpeed = Math.min(1000, targetSpeed + 200); // Greitesnis kilimas
    }
});

decreaseBtn.addEventListener('click', () => {
    if (isRunning) {
        targetSpeed = Math.max(0, targetSpeed - 200); // Greitesnis mažėjimas
    }
});

// Pradėti atnaujinimą
updateSpeed();
