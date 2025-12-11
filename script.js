
```javascript
const endDate = new Date('2026-06-07');
const countdownElem = document.getElementById('countdown');
const blessingElem = document.getElementById('blessing');
const blessingButton = document.getElementById('blessingButton');

const blessings = [
    "愿你们高考顺利，金榜题名！",
    "愿每一位考生都能发挥出色，成绩满意！",
    "放平心态，你们是最棒的！",
    "愿你们最终取得理想的成绩！",
    "相信自己，未来属于你们！",
    "祝你们梦想成真，前程似锦！",
    "努力就是胜利，祝好运！",
    "高考不怕，有我陪伴！",
    "愿你们乘风破浪，勇往直前！",
    "每一次拼搏都是成长，祝福你们！",
    "相信自己，你们能行的！",
    "高考加油，心想事成！",
    "愿书山有路，学海无涯！",
    "希望你们一路顺风，快马加鞭！",
    "祝你们以梦为马，遥行无阻！",
    "高考时刻，心态最重要！",
    "愿成功与你同行，祝梦想成真！",
    "高考是新的开始，加油！",
    "愿此刻的努力，在未来证明自己的价值！",
    "加油，宝贝们，未来的路在你们脚下！",
    "愿每一个微笑背后都有不懈的努力！",
    "祝福你们展翅高飞，勇往直前！",
    "愿你们聚焦目标，快速前行！",
    "梦想在召唤，努力就会实现！",
    "在奋斗中收获希望，祝你们心想事成！",
    "加油吧，亲爱的，未来就等着你们！",
    "愿每一天都有新的期待！",
    "高考是短暂的，成功是永恒的！",
    "愿你们的未来，光芒万丈！",
    "无论成败，努力过的每一天都是值得的！",
    "祝你们在考试中，游刃有余，发挥自如！",
    "有你们在，明天一定更好！",
    "让我们一起期待，你们的辉煌未来！",
    "每一次努力，都是对未来的投资！",
    "加油，冲刺吧，梦想就在前方！",
    "愿你们以梦为马，扬帆起航！",
    "每一滴汗水都会成为明天的辉煌！",
    "给自己一个微笑，继续加油！",
    "相信自己，未来会更美好！"
];

// 计算倒计时并更新显示
function calculateCountdown() {
    const now = new Date();
    const timeDifference = endDate - now;
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    countdownElem.textContent = daysLeft >= 0 ? `${daysLeft} 天` : "高考已经到来了！";
}

// 随机选择祝福语并显示
function showBlessing() {
    const randomIndex = Math.floor(Math.random() * blessings.length);
    blessingElem.textContent = blessings[randomIndex];
}

blessingButton.onclick = showBlessing;

// 每秒更新倒计时
setInterval(calculateCountdown, 1000);
calculateCountdown();
```