// ==================== 全局变量 ====================
const HUNAN_EXAM_DATE = new Date('2025-06-07T09:00:00'); // 湖南高考开始时间
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
    const availableQuotes = QUOTES.filter(q => q !== currentQuote);
    return availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
}

function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = ['#FF6B6B', '#4ECDC4', '#FFD166'][Math.floor(Math.random() * 3)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(particle);
    }
}

function showTouchEffect(x, y) {
    const effect = document.getElementById('touchEffect');
    if (!effect) return;
    
    effect.style.setProperty('--x', x + 'px');
    effect.style.setProperty('--y', y + 'px');
    effect.classList.add('active');
    
    setTimeout(() => {
        effect.classList.remove('active');
    }, 600);
}

// ==================== 倒计时功能 ====================
function updateCountdown() {
    const now = new Date();
    const diff = HUNAN_EXAM_DATE - now;
    
    if (diff <= 0) {
        // 高考已经开始或结束
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.querySelector('.countdown-title').textContent = '高考进行中！加油！';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = pad(days);
    document.getElementById('hours').textContent = pad(hours);
    document.getElementById('minutes').textContent = pad(minutes);
    document.getElementById('seconds').textContent = pad(seconds);
    
    // 更新进度条
    updateProgress();
}

function updateProgress() {
    const startDate = new Date('2024-09-01'); // 高三开学日期
    const now = new Date();
    const totalDays = (HUNAN_EXAM_DATE - startDate) / (1000 * 60 * 60 * 24);
    const passedDays = (now - startDate) / (1000 * 60 * 60 * 24);
    const progress = Math.min(Math.max((passedDays / totalDays) * 100, 0), 100);
    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill && progressText) {
        setTimeout(() => {
            progressFill.style.width = progress + '%';
            progressText.textContent = `已完成 ${Math.round(progress)}%`;
        }, 100);
    }
}

// ==================== 名言功能 ====================
function displayQuote() {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    if (!quoteText || !quoteAuthor) return;
    
    currentQuote = getRandomQuote();
    quoteText.textContent = currentQuote.text;
    quoteAuthor.textContent = currentQuote.author;
    
    // 重新触发动画
    quoteText.style.animation = 'none';
    quoteAuthor.style.animation = 'none';
    setTimeout(() => {
        quoteText.style.animation = 'fadeInUp 0.8s ease-out';
        quoteAuthor.style.animation = 'fadeInUp 0.8s ease-out 0.2s both';
    }, 10);
}

// ==================== 页面初始化 ====================
function initIndexPage() {
    // 更新当前日期
    const currentDateEl = document.getElementById('currentDate');
    if (currentDateEl) {
        const now = new Date();
        currentDateEl.textContent = now.toLocaleDateStrin