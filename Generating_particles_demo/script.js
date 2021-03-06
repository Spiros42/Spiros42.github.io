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

// Line around particles check box
const checkboxLine = document.getElementById("checkboxLine");
let particleLine = false;

// Round radio button
const radioRound = document.getElementById("radioRound");
let round = true;

// Square radio button
const radioSquare = document.getElementById("radioSquare");
let square = false;

// Show input button
const buttonInput = document.getElementById("buttonInput");
let inputShown = false;

// Listener on show input button click
buttonInput.addEventListener("click", function(event)
{
    if (inputShown == false)
    {
        document.getElementById("buttonInput").style.transform = "rotate(90deg)";
        document.getElementById("inputsContainer").style.animation = "drop_up 1s";
        document.getElementById("inputsContainer").style.display = "block";
        document.getElementById("buttonInput").style.background = "white";
        document.getElementById("buttonInput").style.color = "black";
        inputShown = true;
        console.log(inputShown);
    }
    else
    {
        document.getElementById("buttonInput").style.transform = "rotate(0deg)";
        document.getElementById("inputsContainer").style.animation = "fade_out 0.5s";
        window.setTimeout("document.getElementById('inputsContainer').style.display = 'none';", 500);
        document.getElementById("buttonInput").style.background = "none";
        document.getElementById("buttonInput").style.color = "white";
        inputShown = false;
        console.log(inputShown);
    }
    document.getElementById("paragraph").style.animation = "fade_out 1s";
    window.setTimeout("document.getElementById('paragraph').style.display = 'none';", 1000);
    
});
    
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
        document.getElementById("paragraph2").style.animation = "fade_out 1s";
        window.setTimeout("document.getElementById('paragraph2').style.display = 'none';", 1000);
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
checkboxLine.addEventListener("input", function(event)
{
    particleLine = !particleLine;
});

// Listener on round radio button input
radioRound.addEventListener("input", function(event)
{
    round = true;
    square = false;
});
// Listener on square radio button input
radioSquare.addEventListener("input", function(event)
{
    square = true;
    round = false;
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
        if (round == true)
        {
            ctx.strokeStyle = "black";
            ctx.arc(this.x, this.y, this.size ,0 , Math.PI * 2);
            ctx.fill();
            if (particleLine == true)   ctx.stroke();
        }
        if (square == true)
        {
            if (particleLine == true) 
            {
                ctx.strokeStyle = "black";
                ctx.fillRect(this.x - 1, this.y - 1, this.size - 1, this.size - 1);
                ctx.strokeRect(this.x, this.y, this.size, this.size);
            }  
                
            else   ctx.fillRect(this.x, this.y, this.size, this.size);
        }
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
                ctx.lineWidth = 1;
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