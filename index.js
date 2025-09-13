document.getElementById('year').textContent = new Date().getFullYear();


const canvas = document.getElementById('wineCanvas');
const ctx = canvas.getContext('2d');

let dpr = Math.max(1, window.devicePixelRatio || 1);
let width = 0, height = 0;

let level = 0;      
let target = 0;     
let phase = 0;      
const ampBase = 14; 
const wavelength = 280; 
const phaseSpeed = 0.06; 
const ease = 0.02;  
const wineColor = getComputedStyle(document.documentElement)
                   .getPropertyValue('--wine').trim() || '#7b0323';

function resize() {
  const oldH = height;
  width = Math.floor(window.innerWidth);
  height = Math.floor(window.innerHeight);

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); 
  if (oldH > 0) level = (level / oldH) * height;
}
resize();
window.addEventListener('resize', resize);


function draw() {
  ctx.clearRect(0, 0, width, height);


  level += (target - level) * ease;


  const topY = height - level;


  const amp = Math.max(6, ampBase * Math.min(1, level / (height * 0.85)));


  ctx.beginPath();
  ctx.moveTo(0, height);     
  ctx.lineTo(0, topY);       


  const k = (Math.PI * 2) / wavelength;
  for (let x = 0; x <= width; x += 2) {
    const y = topY + Math.sin(x * k + phase) * amp;
    ctx.lineTo(x, y);
  }

  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fillStyle = wineColor; 
  ctx.fill();


  phase += phaseSpeed;

  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);


const btn = document.getElementById('pourBtn');
btn.addEventListener('click', () => {
  const isFilling = target <= 0;
  target = isFilling ? height : 0;
  btn.textContent = isFilling ? '꿀꺽꿀꺽' : '🍷 따르기';
  btn.setAttribute('aria-pressed', String(isFilling));
});
