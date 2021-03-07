// ------------------------------------------------------
// Setup
// ------------------------------------------------------
// ------------------------------------------------------
const canvas  = document.getElementById("canvas1");
const ctx     = canvas.getContext("2d");
canvas.width  = innerWidth;
canvas.height = innerHeight;
let particlesArray = [];
const numberOfParticles = 1000;

// ------------------------------------------------------
// Particle class
// ------------------------------------------------------
// ------------------------------------------------------
class Particle
{
    constructor()
    {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.speed = 1 + Math.random() * 5;
        this.size  = 1 + Math.random() * 5;
    }
    
    // Adding velocity to rectangle
    update()
    {
        this.y += this.speed;
        // When rectangle is out of canvas return it
        // with randomized x position
        if (this.y >= canvas.height)
        {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }
    
    // Draw rectangle
    draw()
    {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.fill();
    }
}

// ------------------------------------------------------
// Functions
// ------------------------------------------------------
// ------------------------------------------------------
// Initialization of the particles array
function init()
{
    for (let i = 0; i < numberOfParticles; i++)
    {
        particlesArray.push(new Particle);
    }
}
init();

// Animate function
function animate()
{
    // Filling black with low alpha for smudge effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Updating and drawing particles
    for (let i = 0; i < particlesArray.length; i++)
    {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();