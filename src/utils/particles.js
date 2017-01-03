const PRECISION = parseFloat(process.env.STORY_RECOGNITION_PRECISION);
const MAX_PARTICLES = 500;
const PARTICLE_NUM_RANGE = () => 5 + Math.round(Math.random() * 5);
const PARTICLE_GRAVITY = 0.075;
const PARTICLE_ALPHA_FADEOUT = 0.96;
const PARTICLE_VELOCITY_RANGE = {
  x: [-1, 1],
  y: [-3.5, -1.5]
};
const COLORS = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#bcbd22',
  '#17becf'
];

let particles = [];

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

requestAnimationFrame(function drawParticles() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.velocity.y += PARTICLE_GRAVITY;
    particle.x += particle.velocity.x;
    particle.y += particle.velocity.y;
    particle.alpha *= PARTICLE_ALPHA_FADEOUT;

    context.fillStyle = `rgba(${particle.color.join(',')}, ${particle.alpha})`;
    context.fillRect(Math.round(particle.x - 1), Math.round(particle.y - 1), 3, 3);
  });

  particles = particles
    .slice(Math.max(particles.length - MAX_PARTICLES, 0))
    .filter((particle) => particle.alpha > 0.1);

  requestAnimationFrame(drawParticles);
});

function createParticle(x, y, color) {
  return {
    x,
    y,
    color,
    alpha: 1,
    velocity: {
      x: PARTICLE_VELOCITY_RANGE.x[0] + Math.random() *
        (PARTICLE_VELOCITY_RANGE.x[1] - PARTICLE_VELOCITY_RANGE.x[0]),
      y: PARTICLE_VELOCITY_RANGE.y[0] + Math.random() *
        (PARTICLE_VELOCITY_RANGE.y[1] - PARTICLE_VELOCITY_RANGE.y[0])
    }
  };
}

export default function spawn(x, y) {
  const numParticles = PARTICLE_NUM_RANGE();
  for (let i = 0; i < numParticles; i++) {
    const colorCode = COLORS[i % COLORS.length];
    const r = parseInt(colorCode.slice(1, 3), 16);
    const g = parseInt(colorCode.slice(3, 5), 16);
    const b = parseInt(colorCode.slice(5, 7), 16);
    const color = [r, g, b];
    particles.push(createParticle(x, y, color));
  }
}
