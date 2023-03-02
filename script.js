const messageContainer = document.querySelector('#d-day-message');
const container = document.querySelector('#d-day-container');
const savedDate = localStorage.getItem('saved-date');

const intervalIdArr = [];

container.style.display = 'none';
messageContainer.innerHTML = '<h3>D-Day를 입력해 주세요.</h3>';


const dateFormMaker = function () {
    const inputYear = document.querySelector("#target-year-input").value;
    const inputMonth = document.querySelector("#target-month-input").value;
    const inputDate = document.querySelector("#target-date-input").value;

    const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
    return dateFormat;
};

const counterMaker = function (date) {
    if (date !== savedDate) {
        localStorage.setItem('saved-date', date);
    }
    const messageContainer = document.querySelector('#d-day-message');
    messageContainer.textContent = 'D-Day를 입력해 주세요.';
    const targetDateInput = dateFormMaker();
    const nowDate = new Date();
    const targetDate = new Date(date).setHours(0, 0, 0, 0);
    const remaining = (targetDate - nowDate) / 1000;
    if (remaining <= 0) {
        container.style.display = 'none';
        messageContainer.innerHTML = '<h3>타이머가 종료되었습니다.</h3>';
        messageContainer.style.display = 'flex';
        setClearInterval();
        return;
    } else if (isNaN(remaining)) {
        container.style.display = 'none';
        messageContainer.innerHTML = '<h3>유효한 시간대가 아닙니다.</h3>';
        messageContainer.style.display = 'flex';
        setClearInterval();
        return;
    }

    const remainingObj = {
        remainingDate: Math.floor(remaining / 3600 / 24),
        remainingHours: Math.floor(remaining / 3600) % 24,
        remainingMin: Math.floor(remaining / 60) % 60,
        remainingSec: Math.floor(remaining) % 60
    }

    const format = function (time) {
        if (time < 10) {
            return '0' + time;
        } else {
            return time;
        }
    }

    const documentObj = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        min: document.getElementById('min'),
        sec: document.getElementById('sec')
    };

    const timeKeys = Object.keys(remainingObj);
    const docKeys = Object.keys(documentObj);

    for (let i = 0; i < timeKeys.length; i = i + 1) {
        const remainingTime = format(remainingObj[timeKeys[i]]);
        documentObj[docKeys[i]].textContent = remainingTime;
    };

};

const starter = function (targetDateInput) {
    if (!targetDateInput) {
        targetDateInput = dateFormMaker();
    }
    container.style.display = 'flex';
    messageContainer.style.display = 'none';
    setClearInterval();
    counterMaker(targetDateInput);
    const intervalId = setInterval(() => { counterMaker(targetDateInput); }, 1000);
    intervalIdArr.push(intervalId)
};

const setClearInterval = function () {
    localStorage.removeItem('saved-date');
    for (let i = 0; i < intervalIdArr.length; i++) {
        clearInterval(intervalIdArr[i]);
    }
}

const resetTimer = function () {
    container.style.display = 'none';
    messageContainer.innerHTML = '<h3>D-Day를 입력해 주세요.</h3>';
    messageContainer.style.display = 'flex';
    setClearInterval()
}

if (savedDate) {
    starter(savedDate);
} else {
    container.style.display = 'none';
    messageContainer.innerHTML = '<h3>D-Day를 입력해 주세요.</h3>';
}