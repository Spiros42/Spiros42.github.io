// ------------------------------------------------------
// Setup
// ------------------------------------------------------
// ------------------------------------------------------
// Canvas and context setup
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// Particle array declaration
const particlesArray = [];

// Mouse constant with mouse down boolean
const mouse =
{
    x: undefined, 
    y: undefined, 
}
let mouse_down = false;

// ------------------------------------------------------
// Handling inputs
// ------------------------------------------------------
// ------------------------------------------------------
// Particle speed slider
const sliderSpeed = document.getElementById("sliderSpeed");
const speedValue = document.getElementById("speedValue");
speedValue.innerHTML = sliderSpeed.value;
let speed = sliderSpeed.value;

// Connection distance slider
const sliderDistance = document.getElementById("sliderDistance");
const distanceValue = document.getElementById("distanceValue");
distanceValue.innerHTML = sliderDistance.value;
let connectionDistance = sliderDistance.value;

// Particle size slider
const sliderSize = document.getElementById("sliderSize");
const sizeValue = document.getElementById("sizeValue");
sizeValue.innerHTML = sliderSize.value;
let particleSize = sliderSize.value;

// Hue slider
const sliderHue = document.getElementById("sliderHue");
let hueIncrement = sliderHue.value / 10;    
let hue = 0;

// Opacity slider
const sliderOpacity = document.getElementById("sliderOpacity");
let opacity = sliderOpacity.value / 100 * -1;

// Line width randomization checkbox
const checkboxLineWidth = document.getElementById("checkboxLineWidth");
let fixedLineWidth = true;


// ------------------------------------------------------
// Listeners
// ------------------------------------------------------
// ------------------------------------------------------
// Listener on event resize
window.addEventListener("resize", function(event)
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

// Disabling context menu on right click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);


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

// Listener on connection distance slider input
sliderDistance.addEventListener("input", function(event)
{
    distanceValue.innerHTML = sliderDistance.value;
    connectionDistance = sliderDistance.value;
});

// Listener on particle size slider input
sliderSize.addEventListener("input", function(event)
{
    sizeValue.innerHTML = sliderSize.value;
    particleSize = sliderSize.value;
});

// Listener on hue slider input
sliderHue.addEventListener("input", function(event)
{
    hueIncrement = sliderHue.value / 10;
});

// Listener on opacity slider input
sliderOpacity.addEventListener("input", function(event)
{
    opacity = sliderOpacity.value / 100 * -1;
});

// Listener on line randomization checkbox
checkboxLineWidth.addEventListener("input", function(event)
{
    if (fixedLineWidth == false) fixedLineWidth = true;
    else if (fixedLineWidth == true) fixedLineWidth = false;
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
        this.size = Math.random() * particleSize + 1;
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
            // When particles are closer than variable make line between them
            if (distance < connectionDistance)
            {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                if (fixedLineWidth == true)
                {
                    ctx.lineWidth = 1;
                }
                else
                {
                    ctx.lineWidth = particlesArray[i].size;
                }
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
    ctx.fillStyle = "rgba(0, 0, 0," + opacity +  ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue += hueIncrement;

    requestAnimationFrame(animate);    
}
animate();