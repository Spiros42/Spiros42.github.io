// ------------------------------------------------------
// Canvas and context setup
// ------------------------------------------------------
// ------------------------------------------------------
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
const particlesArray = [];

const mouse = {x: undefined, y: undefined, }
let mouse_down = false;

let hue = 0;

// ------------------------------------------------------
// Handling inputs
// ------------------------------------------------------
// ------------------------------------------------------
// Particle speed slider
const sliderSpeed = document.getElementById("sliderSpeed");
const speedValue = document.getElementById("speedValue");
speedValue.innerHTML = sliderSpeed.value;
let speed = sliderSpeed.value;


// ------------------------------------------------------
// Listeners
// ------------------------------------------------------
// ------------------------------------------------------
// Listener on event resize
window.addEventListener("resize", function()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Listener on event mouse down
canvas.addEventListener("mousedown", function(event)
{
    mouse_down = true;
});

// Listener on event mouse up
canvas.addEventListener("mouseup", function(event)
{
    mouse_down = false;
});

// Listener on event mouse move
canvas.addEventListener("mousemove", function(event)
{
    // If mouse button is down draw at mouse
    if (mouse_down == true)
    {
        mouse.x = event.x;
        mouse.y = event.y;
        // Create x particles
        for (let i = 0; i < 5; i++)
        {
            particlesArray.push(new Particle());
        }
    }
});

// ------------------------------------------------------
// Input listeners
// ------------------------------------------------------
// ------------------------------------------------------
// Listener on particle speed slider
sliderSpeed.addEventListener("input",function(event)
{
    speedValue.innerHTML = sliderSpeed.value;
    speed = sliderSpeed.value;
});


// ------------------------------------------------------
// Particle class
// ------------------------------------------------------
// ------------------------------------------------------
class Particle
{
    constructor()
    {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 8 + 1;
        this.speedX = Math.random() * speed - speed / 2;
        this.speedY = Math.random() * speed - speed / 2;
        this.color = "hsl( "+ hue + ", 100%, 50%)";
    }
    // Particle update function
    update()
    {
        this.x += this.speedX;
        this.y += this.speedY;
        // Decrease size if under threshold or set 0
        if (this.size > 0.3) this.size -= 0.3;
        else this.size = 0;
    }
    // Particle draw function
    draw()
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size ,0 , Math.PI * 2);
        ctx.fill();
    }
}

// ------------------------------------------------------
// Functions
// ------------------------------------------------------
// ------------------------------------------------------
// Updating and drawing particles
function handleParticles()
{
    for (let i = 0; i < particlesArray.length; i++)
    {
        particlesArray[i].update();
        particlesArray[i].draw();
        // Calculating distances
        for (let j = i; j < particlesArray.length; j++)
        {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            // When particles are closer than 100px make line between them
            if (distance < 100)
            {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = particlesArray[i].size;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
        // Deleting particles with size under threshold
        if (particlesArray[i].size <= 0.3)
        {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

// Animate function
function animate()
{
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue += 3;

    requestAnimationFrame(animate);    
}
animate();