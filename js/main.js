// ==================== 全局变量 ====================
const HUNAN_EXAM_DATE = new Date('2025-06-07T09:00:00');
const QUOTES = [
    { text: "岳麓山下，湘江之滨，湖南学子，必创辉煌！", author: "湖湘精神" },
    { text: "吃得苦，耐得烦，霸得蛮！湖南人，不服输！", author: "湖南人性格" },
    { text: "一分耕耘，一分收获。今日的努力，明日的辉煌。", author: "励志语录" },
    { text: "高考不是人生的全部，但它是你青春最美的见证。", author: "青春寄语" },
    { text: "橘子洲头，看万山红遍。金榜题名，待我辈英雄。", author: "毛泽东诗意" },
    { text: "湘江水长，奋斗不止。今日拼搏，明朝腾飞。", author: "湖南学子" },
    { text: "凤凰涅槃，浴火重生。高考之战，势在必得。", author: "战斗宣言" },
    { text: "书山有路勤为径，学海无涯苦作舟。", author: "古语励志" },
    { text: "青春不负梦想，奋斗成就未来。", author: "青春誓言" },
    { text: "湖南人的血性，就是敢为天下先！", author: "湖湘文化" },
    { text: "每一滴汗水，都是通往梦想的阶梯。", author: "励志语录" },
    { text: "今日的努力，是为了明日的自由。", author: "自由宣言" }
];

let currentQuote = null;
let countdownInterval = null;

// ==================== 工具函数 ====================
function pad(num) {
    return num.toString().padStart(2, '0');
}

function getRandomQuote() {
    const available = QUOTES.filter(q => q !== currentQuote);
    return available[Math.floor(Math.random() * available.length)];
}

function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.width = p.style.height = `${Math.random() * 6 + 2}px`;
        p.style.backgroundColor = ['#FF6B6B', '#4ECDC4', '#FFD166'][Math.floor(Math.random() * 3)];
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.animationDelay = `${Math.random() * 6}s`;
        p.style.animationDuration = `${Math.random() * 4 + 4}s`;
        container.appendChild(p);
    }
}

function showTouchEffect(x, y) {
    const effect = document.getElementById('touchEffect');
    if (!effect) return;
    effect.style.setProperty('--x', `${x}px`);
    effect.style.setProperty('--y', `${y}px`);
    effect.classList.add('active');
    setTimeout(() => effect.classList.remove('active'), 600);
}

// ==================== 倒计时 ====================
function updateCountdown() {
    const diff = HUNAN_EXAM_DATE - new Date();
    if (diff <= 0) {
        ['days', 'hours', 'minutes', 'seconds'].forEach(id =>
            document.getElementById(id).textContent = '00'
        );
        document.querySelector('.countdown-title').textContent = '高考进行中！加油！';
        if (countdownInterval) clearInterval(countdownInterval);
        return;
    }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5) / 6e4);
    const s = Math.floor((diff % 6e4) / 1e3);
    document.getElementById('days').textContent = pad(d);
    document.getElementById('hours').textContent = pad(h);
    document.getElementById('minutes').textContent = pad(m);
    document.getElementById('seconds').textContent = pad(s);
    updateProgress();
}

function updateProgress() {
    const start = new Date('2024-09-01');
    const now = new Date();
    const total = (HUNAN_EXAM_DATE - start) / 864e5;
    const passed = (now - start) / 864e5;
    const pct = Math.min(100, Math.max(0, (passed / total) * 100));
    const fill = document.getElementById('progressFill');
    const txt = document.getElementById('progressText');
    if (fill && txt) {
        fill.style.width = `${Math.round(pct)}%`;
        txt.textContent = `已完成 ${Math.round(pct)}%`;
    }
}

// ==================== 名言 ====================
function displayQuote() {
    const qt = document.getElementById('quoteText');
    const qa = document.getElementById('quoteAuthor');
    if (!qt || !qa) return;
    currentQuote = getRandomQuote();
    qt.textContent = currentQuote.text;
    qa.textContent = currentQuote.author;
    qt.style.animation = 'none';
    qa.style.animation = 'none';
    setTimeout(() => {
        qt.style.animation = 'fadeInUp 0.8s ease-out';
        qa.style.animation = 'fadeInUp 0.8s ease-out 0.2s both';
    }, 10);
}

// ==================== 初始化 ====================
function initIndexPage() {
    const currentDateEl = document.getElementById('currentDate');
    if (currentDateEl) {
        currentDateEl.textContent = new Date().toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    }
    updateCountdown();
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);

    const section = document.getElementById('countdownSection');
    if (section) {
        section.addEventListener('click', e => {
            const tip = document.querySelector('.countdown-tip');
            if (tip) {
                tip.textContent = '✨ 能量 +1，湖南学子最棒！';
                setTimeout(() => { tip.textContent = '点击倒计时，获取加油能量'; }, 1500);
            }
            const rect = section.getBoundingClientRect();
            showTouchEffec