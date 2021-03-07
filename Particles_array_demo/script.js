// Setup
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];

// Listener on event resize
window.addEventListener("resize", function()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

// Mouse constant
const mouse = 
{
    x: undefined,
    y: undefined,
}

// Listener on event mouse click
canvas.addEventListener("mouseclick", function(event)
{
    mouse.x = event.x;
    mouse.y = event.y;
})

// Listener on event mouse move
canvas.addEventListener("mousemove", function(event)
{
    mouse.x = event.x;
    mouse.y = event.y;
})

// Particle class
class Particle
{
    constructor()
    {
        this.radius = 15;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        // X coordinates with conditions
        this.x = (Math.random() * canvas.width)
        if (this.x < this.radius) this.x = this.radius;
        if (this.x > canvas.width - this.radius) this.x = canvas.width - this.radius
        this.y = (Math.random() * canvas.height);
        // Y coordinates with conditions
        if (this.y < this.radius) this.y = this.radius;
        if (this.y > canvas.height - this.radius) this.y = canvas.height - this.radius
    }
    // Particle update function
    update()
    {
        if (this.x + this.radius > canvas.width || this.x - 15 < 0) this.speedX = -this.speedX;
        if (this.y + this.radius > canvas.height || this.y - 15 < 0) this.speedY = -this.speedY;
        this.x += this.speedX;
        this.y += this.speedY;
    }
    // Particle draw function
    draw()
    {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius ,0 , Math.PI * 2);
        ctx.fill();
    }
}

// Initialization of particles array
function init_array() 
{
    for (let i = 0; i < 250; i++)
    {
        particlesArray.push(new Particle());
    }    
}
init_array();

// Updating and drawing particles
function handleParticles()
{
    for (let i = 0; i < particlesArray.length; i++)
    {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

// Animate function
function animate()
{
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
}

animate();
console.log(particlesArray);