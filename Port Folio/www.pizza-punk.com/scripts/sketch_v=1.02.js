let f = 0;

let pxd = 2, scvs;

let nbFrames = 30;
let seed;
let diag;
let easing = 0.05;

let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

let c1,c2;



const data = [
    { lx: 9, ly: 8, coef: 13, divAngle: 7, nbP:40, a1: 5,  a2: 9 },
    { lx: 7, ly: 6, coef: 14, divAngle: 8, nbP:40, a1: 3,  a2: 6 },
    { lx: 9, ly: 4, coef: 11, divAngle: 6, nbP:40, a1: 5,  a2: 9 },
    { lx: 6, ly: 6, coef: 12, divAngle: 6, nbP:40, a1: 10, a2: 10 },
    { lx: 7, ly: 8, coef: 13, divAngle: 8, nbP:40, a1: 10, a2: 7 },
    { lx: 7, ly: 6, coef: 12, divAngle: 6, nbP:40, a1: 5,  a2: 9 },
    { lx: 6, ly: 7, coef: 11, divAngle: 6, nbP:40, a1: 8,  a2: 5 },
    { lx: 7, ly: 9, coef: 13, divAngle: 7, nbP:40, a1: 9,  a2: 6 },
    { lx: 9, ly: 9, coef: 14, divAngle: 5, nbP:40, a1: 10, a2: 7 }, 
    { lx: 8, ly: 4, coef: 14, divAngle: 8, nbP: 40, a1: 4 , a2: 9 },
    {lx: 9, ly: 9, coef: 11, divAngle: 5, nbP: 40, a1: 4 , a2: 6 }
];

const params = {
    lx: 9,ly: 9,coef: 14,divAngle: 5,nbP: 50,a1: 10,a2: 7,
};


function assignTabData(data, params) {
    const randomIndex = Math.floor(Math.random() * data.length);
    const datas = data[randomIndex];
    const keys = Object.keys(params);
    Object.values(datas).forEach((value, index) => {
        if (keys[index] !== undefined) {
            params[keys[index]] = value;
        }
    });
}

let currentLx = params.lx;
let currentLy = params.ly;
let currentA1 = params.a1;
let currentA2 = params.a2;
let currentCoef = params.coef;
let currentDivAngle = params.divAngle;

assignTabData(data, params);

console.log(params);

window.MySketch = {
    
    changeConfig: () => {
        params.lx = int(random(2, 10));
        params.ly = int(random(2, 10));
        params.coef = int(random(10, 15));
        params.divAngle = int(random(5, 9))
        params.a1 = int(random(2, 12));
        params.a2 = int(random(2, 12));
        console.log(params);
    },
    changeColors: () => {
        theme = localStorage.getItem('theme');
        if(theme==='dark'){
            c1='#1a1a1a';
            c2='#e5e5e5';
        } else{
            c1='#e5e5e5';
            c2='#1a1a1a';
        }
    }
};



function setup() {
    MySketch.changeColors();

    setAttributes('antialias', true);
    myCanvas = createCanvas(displayWidth, displayHeight, WEBGL);

    isParent = select("#sketch");
    myCanvas.parent(isParent);

    windowResized();
}


function draw() {
    
    currentLx += (params.lx - currentLx) * easing;
    currentLy += (params.ly - currentLy) * easing;
    currentA1 += (params.a1 - currentA1) * easing;
    currentA2 += (params.a2 - currentA2) * easing;
    currentCoef += (params.coef - currentCoef) * easing;
    currentDivAngle += (params.divAngle - currentDivAngle) * easing;

    colFond = color(c1);
    colObjt = color(c2);
    
    noStroke();
    rectMode(CENTER);
    t = (frameCount / nbFrames) % 1;

    background(colFond);
    fill(colObjt)

    for (let i = 0; i < params.nbP; i++) {
        let p = (i + t) / params.nbP;
        let angle = map(p, 0, 1, 0, TAU / currentDivAngle);

        for (let i = 0; i < params.nbP; i++) {
            let a = map(i, 0, params.nbP, 0, TAU);
            rad = 0.35;
            let r = 1 + sin((angle*currentCoef)/2)*2;

            push();
            translate(
                (sin(a + angle * currentLx) * height / 1.5 * rad) + (sin(a + angle * currentA1) * xrad), 
                (cos(a + angle * currentLy) * height / 1.5 * rad) + (cos(a + angle * currentA1) * yrad), 
                0);
            box(r)
            pop();
            
        }
    }
}




computePos = (p) => {
    

}


function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    diag = (sqrt(width * width + height * height)) / 2;
    xrad = (window.innerWidth<400)?50:100;
    yrad = (window.innerWidth<400)?50:100;
    MySketch.changeColors();
}
function keyPressed() {
    if (key === "p" || key === "P") isLooping() ? noLoop() : loop();
}