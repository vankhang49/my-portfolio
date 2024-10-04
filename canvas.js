let banner = document.querySelector('#profile');
let canvas = document.getElementById('dotsCanvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');
let dots = [];

const darkModeColors = ['#eee', '#ffffff', '#ffb600'];
const lightModeColors = ['#675cc3', '#f5beff', '#76a4ef']; // Thay đổi màu cho chế độ sáng
let currentColors = darkModeColors;

const updateColors = () => {
    if (document.documentElement.classList.contains('light-mode')) {
        currentColors = lightModeColors;
    } else {
        currentColors = darkModeColors;
    }
};

// Hàm để tạo các điểm (dots)
const createDots = (count) => {
    dots = [];
    for (let index = 0; index < count; index++) {
        dots.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            size: Math.random() * 2 + 1,
            color: currentColors[Math.floor(Math.random() * currentColors.length)]
        });
    }
};

// Tạo các điểm và vẽ ngôi sao
updateColors();
createDots(70);

const drawStar = (x, y, size, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - size * 1.5);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x, y + size * 1.5);
    ctx.lineTo(x - size, y);
    ctx.closePath();
    ctx.fill();
}

const drawDots = () => {
    dots.forEach(dot => {
        drawStar(dot.x, dot.y, dot.size, dot.color); // Sử dụng hàm vẽ ngôi sao
    });
}

drawDots();

banner.addEventListener('mousemove', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    let mouse = {
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.pageY - banner.getBoundingClientRect().top
    };
    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 300) {
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
});

banner.addEventListener('mouseout', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
});

window.addEventListener('resize', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;

    createDots(50); // Tạo lại các điểm với màu sắc mới
    drawDots();
});

// Hàm để cập nhật màu sắc và vẽ lại khi chuyển đổi chế độ
const refreshDots = () => {
    updateColors(); // Cập nhật màu sắc
    createDots(70); // Tạo lại các điểm
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots(); // Vẽ lại các điểm
};

// Lắng nghe sự kiện chuyển đổi chế độ
var modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', function () {
    document.documentElement.classList.toggle('light-mode');
    modeSwitch.classList.toggle('active');
    refreshDots(); // Gọi hàm để cập nhật màu sắc và vẽ lại
});

// Đầu tiên gọi updateColors để thiết lập màu sắc ban đầu
updateColors();