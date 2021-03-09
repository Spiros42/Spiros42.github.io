// ------------------------------------------------------
// Setup
// ------------------------------------------------------
// ------------------------------------------------------
// Canvas setup
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// Particle array setup
let particlesArray = [];

// Adjustable variables
const maxDistance = 200;
let forceMultiplicator = 7;

// Mouse interaction radius
const radius = maxDistance;

// Mouse down variables
let leftMouseDown = false;
let rightMouseDown = false;

// Mouse constant
const mouse = 
{
    x: undefined,
    y: undefined
}


// ------------------------------------------------------
// Handling inputs
// ------------------------------------------------------
// ------------------------------------------------------
// Particle range slider
const particleRange = document.getElementById("particleRange");
const particleValue = document.getElementById("particleValue");
particleValue.innerHTML = particleRange.value;
numberOfParticles = particleRange.value;

// Connection distance threshold slider
const thresholdSlider = document.getElementById("threshold");
const thresholdValue = document.getElementById("thresholdValue");
thresholdValue.innerHTML = thresholdSlider.value;
let connectThreshold = thresholdSlider.value;

// Alpha slider
const alphaSlider = document.getElementById("alphaRange");
let alpha = alphaSlider.value / 100 * -1;

// Color shift sliders
const colorStartSlider = document.getElementById("colorStart");
const colorEndSlider = document.getElementById("colorEnd");
let colorShift = 
{
    start: colorStartSlider.value,
    end: colorEndSlider.value
}

// One color checkbox
const oneColorCheckBox = document.getElementById("oneColor");
let oneColor = false;
let baseColor = 0;


// ------------------------------------------------------
// Listeners
// ------------------------------------------------------
// ------------------------------------------------------
// Listener on window resize
window.addEventListener("resize", function()
{
    location.reload();
});

// Listener on event mouse down
canvas.addEventListener("mousedown", function(event)
{
    if (event.button == 0) leftMouseDown = true;
    if (event.button == 2) rightMouseDown = true;
});

// Listener on event mouse up
canvas.addEventListener("mouseup", function(event)
{
    leftMouseDown = false;
    rightMouseDown = false;
});

// Listener on event mouse move
canvas.addEventListener("mousemove", function(event)
{
    mouse.x = event.x;
    mouse.y = event.y;
});

// Disabling context menu on right click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);


// ------------------------------------------------------
// Input listeners
// ------------------------------------------------------
// ------------------------------------------------------
// Listener on particle slider input
particleRange.addEventListener("input", function(event)
{
    particlesArray = [];
    particleValue.innerHTML = this.value;
    numberOfParticles = this.value;
    init();    
});

// Listener on Distance connection threshold slider
thresholdSlider.addEventListener("input",function(event)
{
    thresholdValue.innerHTML = thresholdSlider.value;
    connectThreshold = thresholdSlider.value;
});

// Listener on Distance connection threshold slider
alphaSlider.addEventListener("input",function(event)
{
    alpha = alphaSlider.value / 100 * -1;
});

// Listener on color shift start slider
colorStartSlider.addEventListener("input", function(event)
{
    colorShift.start = colorStartSlider.value;
});

// Listener on color shift end slider
colorEndSlider.addEventListener("input", function(event)
{
    colorShift.end = colorEndSlider.value;
});

// Listener on one color checkbox input
oneColorCheckBox.addEventListener("input", function(event)
{
    if (oneColor == false)
    {
        baseColor = colorEndSlider.value;
        colorEndSlider.value = 0;
        colorEndSlider.disabled = true;
        colorShift.end = 0; 
        oneColor = true;
    }
    else
    {
        colorEndSlider.value = baseColor;
        colorShift.end = colorEndSlider.value;
        colorEndSlider.disabled = false;
        oneColor = false;
    }
});


// ------------------------------------------------------
// Particle class
// ------------------------------------------------------
// ------------------------------------------------------
class Particle
{
    constructor()
    {
        this.speedX = Math.random() * 2.5 - 1.25;
        this.speedY = Math.random() * 2.5 - 1.25;
        this.x = (Math.random() * canvas.width);
        this.y = (Math.random() * canvas.height);
    }

    // Particle update function
    update()
    {             
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance  = Math.sqrt(dx * dx + dy * dy);
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let force = ((maxDistance - distance) / maxDistance)
         * forceMultiplicator;
        let directionX = forceDirectionX * force;
        let directionY = forceDirectionY * force;        
        
        if (distance <= radius)
        {
            if (leftMouseDown == true)
            {
                this.x += directionX;
                this.y += directionY;
            }
            else if (rightMouseDown == true)
            {
                this.x -= directionX;
                this.y -= directionY;
            }
            else
            {
                this.x += this.speedX;
                this.y += this.speedY;
            }
            if (this.x >= canvas.width || this.x <= 0) 
                this.speedX = -this.speedX;
            if (this.y >= canvas.height || this.y <= 0)
                 this.speedY = -this.speedY;
        }
        else
        {
            if (this.x >= canvas.width || this.x <= 0) 
                this.speedX = -this.speedX;
            if (this.y >= canvas.height || this.y <= 0) 
                this.speedY = -this.speedY;
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
}


// ------------------------------------------------------
// Functions
// ------------------------------------------------------
// ------------------------------------------------------
// Initialization of particles array
function init() 
{
    for (let i = 0; i < numberOfParticles; i++)
    {
        particlesArray.push(new Particle());
    }    
}
init();

// Updating and drawing particles
function handleParticles()
{
    for (let i = 0; i < particlesArray.length; i++)
    {
        particlesArray[i].update();
    }
}

// Animate function
function animate()
{   
    ctx.fillStyle = "rgba(0, 0, 0," + alpha + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    connect();

    requestAnimationFrame(animate);
}
animate();

// Connect particles function
function connect()
{
    let hue = colorShift.start;
    for (let a = 0; a < particlesArray.length; a++)
    {
        for (let b = a; b < particlesArray.length; b++)
        {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectThreshold)
            {
                let color = "hsl( "+ hue + ", 100%, 60%)"
                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
                hue++;
                if (hue > colorShift.end) hue = colorShift.start;
            }
        }
    }
}