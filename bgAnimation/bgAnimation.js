const BACKGROUND_COLOR = 0

const MIN_NOISE_DETAIL = 1
const MAX_NOISE_DETAIL = 3
const NOISE_SCALE = 1

const MIN_DENSITY = 15
const MAX_DENSITY = 33

const MIN_ANIMATION_LENGTH = 5000
const MAX_ANIMATION_LENGTH = 10000

const LINE_BRIGHTNESS = 200

let animationLength
let startTime
let lines

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight)
    canvas.position(0, 0)
    canvas.style('z-index', '-1')
    angleMode(DEGREES)
    
    resetAnimation()
}

function draw() {
    runAnimation()
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight)
}

function resetAnimation() {
    lines = setupLines(random(MIN_DENSITY, MAX_DENSITY))
    startTime = millis()
    animationLength = random(MIN_ANIMATION_LENGTH, MAX_ANIMATION_LENGTH) 
}

function runAnimation() {
    background(BACKGROUND_COLOR)
    const timePassed = millis() - startTime
    // brightness = LINE_BRIGHTNESS * (timePassed / animationLength)
    const brightness = LINE_BRIGHTNESS * (1 - timePassed / animationLength)
    stroke(brightness)
    
    if (timePassed > animationLength) {
        noiseDetail(random(MIN_NOISE_DETAIL, MAX_NOISE_DETAIL), NOISE_SCALE)
        resetAnimation()
    }
    
    lines.forEach(line => line.render())
}

function setupLines(density) {
    const lines = []

    const spacing = window.innerWidth / density
    
    for (let x = 0; x < window.innerWidth; x += spacing) {
        for (let y = 0; y < window.innerHeight; y += spacing) {
            const line = new Line(x, y)
            lines.push(line)
        }
    }

    return lines
}