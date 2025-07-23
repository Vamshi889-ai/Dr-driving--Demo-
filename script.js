const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mute = false;
document.getElementById('muteBtn').onclick = () => {
  mute = !mute;
  document.getElementById('muteBtn').textContent = mute ? "Unmute" : "Mute";
};

// Hide splash after 2 seconds
setTimeout(() => {
  document.getElementById('splash').style.display = 'none';
}, 2000);

// Player car
let player = { x: canvas.width/2, y: canvas.height - 120, speed: 6 };

// Traffic cars
let traffic = [
  { x: canvas.width/2 - 50, y: -200, speed: 3 },
  { x: canvas.width/2 + 50, y: -500, speed: 4 }
];

function drawCar(car, color) {
  ctx.fillStyle = color;
  ctx.fillRect(car.x - 25, car.y - 50, 50, 100);
}

function gameLoop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  // Draw road
  ctx.fillStyle = '#222';
  ctx.fillRect(canvas.width/2 - 100,0,200,canvas.height);
  
  // Player car
  drawCar(player, 'blue');
  
  // Traffic
  traffic.forEach(car => {
    car.y += car.speed;
    if(car.y > canvas.height) car.y = -200;
    drawCar(car, 'red');
  });

  requestAnimationFrame(gameLoop);
}
gameLoop();

// Voice Assist Simulation
function voiceAssist(message){
  if(!mute) {
    let utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
  }
}

setInterval(()=>{
  let nearestTraffic = traffic[0].speed;
  if(player.speed > nearestTraffic + 2){
    voiceAssist("Overtake now at safe speed");
  } else {
    voiceAssist("Slow down, wait to overtake");
  }
}, 5000);

// Touch controls (left/right)
document.addEventListener('touchstart', (e)=>{
  if(e.touches[0].clientX < canvas.width/2){
    player.x -= 30; // move left
  } else {
    player.x += 30; // move right
  }
});
