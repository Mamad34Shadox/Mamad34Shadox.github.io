
const videoURL =
"https://www.imagenetz.de/files/4b1d5ea553aa84972b6950f00903e275.mp4";

// شروع شوخی
function startPrank() {

    showPage("matrixPage");

    startMatrix();

    // نمایش صفحه هک به مدت ۵ ثانیه
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


// ماتریکس
let matrixAnimation;
let matrixRunning = false;

function startMatrix() {

    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const symbols = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 18;

    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

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

    cancelAnimationFrame(matrixAnimation);
}


// تغییر اندازه صفحه
window.addEventListener("resize", () => {

    if (matrixRunning) {
        startMatrix();
    }

});
