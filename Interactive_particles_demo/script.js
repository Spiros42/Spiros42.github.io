// ------------------------------------------------------
// Setup
// ------------------------------------------------------
// ------------------------------------------------------
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
// Variables for adjusting position
let adjustSize = innerWidth * 0.005;
let adjustX = (innerWidth   / 2) - (130 * innerWidth * 0.005 / 2);
let adjustY =  (innerHeight / 2) - (40 * innerHeight * 0.005 / 2);
// Interaction radius around the mouse
const radius = adjustSize * 7.5;
// Handling mouse interactions
const mouse = 
{
    x: null,
    y: null,
}
// Getting image data of text/image
ctx.fillStyle = "white";
ctx.font = "30px Verdana";
ctx.fillText("Spiros42", 0, 30);
const imageData = ctx.getImageData(0, 0, 130, 40);


// ------------------------------------------------------
// Listeners
// ------------------------------------------------------
// ------------------------------------------------------
// Listener on event mouse move
window.addEventListener("mousemove",function(event)
{
    mouse.x = event.x;
    mouse.y = event.y;
});

// ------------------------------------------------------
// Particle class
// ------------------------------------------------------
// ------------------------------------------------------
class Particle
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.size = 3;
        // Density change the force
        this.desnity = (Math.random() * 30) + 1; 
        // Vars for holding original position of particle
        this.baseX = this.x;
        this.baseY = this.y;
    }

    draw()
    {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    }

    update()
    {
        let maxDistance = radius;
        // Calculating distance between 
        // mouse and particle coordinates
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance  = Math.sqrt(dx * dx + dy * dy);
        // Calculating force applied
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.desnity;
        let directionY = forceDirectionY * force * this.desnity;

        // When particle is in radius
        if (distance < radius)
        {
            // Move away
            this.x -= directionX;
            this.y -= directionY;
        }
        // When particle is out of radius
        else
        {
            // And particle is away from original
            // position then slowly return it
            if (this.x != this.baseX)
            {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y != this.baseY)
            {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}

// ------------------------------------------------------
// Functions
// ------------------------------------------------------
// ------------------------------------------------------
// Particle array initialization
function init()
{
    particleArray = [];

    // Going through imageData
    for (let y = 0, y2 = imageData.height; y < y2; y++)
    {
        for (let x = 0, x2 = imageData.width; x < x2; x++)
        {
            // If opacity of x,y imageData is below 128
            // 128 is cca 50% of opacity (every 4th value 0-255)
            if (imageData.data[
                (y * 4 * imageData.width) + (x * 4) + 3] > 128)
            {
                let positionX = x;
                let positionY = y;
                // Push new particle with x and y
                // position multiplied for scaling
                particleArray.push(new Particle
                                    (positionX * adjustSize + adjustX,
                                     positionY * adjustSize + adjustY
                                    ));
            }
        }
    }
}
init();

// Animate function
function animate()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++)
    {
        particleArray[i].draw();
        particleArray[i].update();
    }

    requestAnimationFrame(animate);
}
animate();