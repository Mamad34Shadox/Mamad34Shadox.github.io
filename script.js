// آدرس ویدیوی پایانی
const videoURL =
    "https://www.imagenetz.de/files/4b1d5ea553aa84972b6950f00903e275.mp4";

const home = document.getElementById("home");
const matrixPage = document.getElementById("matrixPage");
const jokePage = document.getElementById("jokePage");

const button = document.querySelector(".edit-button");

let matrixAnimation = null;
let matrixRunning = false;
let prankStarted = false;


// شروع شوخی
function startPrank() {

    if (prankStarted) return;

    prankStarted = true;
    button.disabled = true;

    showPage("matrixPage");

    startMatrix();

    // نمایش ماتریکس به مدت ۵ ثانیه
    setTimeout(() => {

        stopMatrix();

        showPage("jokePage");

        // سه ثانیه بعد انتقال به ویدیو
        setTimeout(() => {

            window.location.href = videoURL;

        }, 3000);

    }, 5000);
}


// مدیریت صفحات
function showPage(pageID) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });

    document.getElementById(pageID).classList.remove("hidden");
}


// تنظیمات ماتریکس
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

const symbols = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 18;

let drops = [];


// تنظیم اندازه صفحه
function resizeMatrix() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / fontSize);

    drops = Array(columns).fill(1);
}


// شروع ماتریکس
function startMatrix() {

    if (matrixRunning) return;

    resizeMatrix();

    matrixRunning = true;

    function draw() {

        if (!matrixRunning) return;

        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff41";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {

            const symbol =
                symbols[Math.floor(Math.random() * symbols.length)];

            ctx.fillText(
                symbol,
                i * fontSize,
                drops[i] * fontSize
            );

            if (
                drops[i] * fontSize > canvas.height &&
                Math.random() > 0.975
            ) {
                drops[i] = 0;
            }

            drops[i]++;
        }

        matrixAnimation = requestAnimationFrame(draw);
    }

    draw();
}


// توقف ماتریکس
function stopMatrix() {

    matrixRunning = false;

    if (matrixAnimation !== null) {
        cancelAnimationFrame(matrixAnimation);
        matrixAnimation = null;
    }
}


// تغییر اندازه صفحه
window.addEventListener("resize", () => {

    if (matrixRunning) {
        resizeMatrix();
    }

});
