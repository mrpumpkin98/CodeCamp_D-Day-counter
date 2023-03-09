
//============================>[ 전역변수 1 ]<===================================

const messageContainer = document.querySelector('#d-day-message');
const container = document.querySelector('#d-day-container');

// ]------------------------------------------> localStorage : pc를 종료하더라도 그대로 남아있게 된다.   
const savedDate = localStorage.getItem('saved-date');

// ]----------------------------------------------> intervalId를 담아주는 배열       
const intervalIdArr = [];

container.style.display = 'none';
messageContainer.innerHTML = '<h3>D-Day를 입력해 주세요.</h3>';


//============================>[ 시간 데이터를 입력하는 함수 ]<==============================

const dateFormMaker = function () {
    const inputYear = document.querySelector("#target-year-input").value;
    const inputMonth = document.querySelector("#target-month-input").value;
    const inputDate = document.querySelector("#target-date-input").value;

    const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
    return dateFormat;
};


//===========================>[ 입력된 시간을 (일, 시, 분, 초)로 만들어주는 함수  ]<===============================

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

    // ]----------------------------------------------> 지난 날짜 입력과 잘못된 값 입력시 대응
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

    // ]----------------------------------------------> 시간값 앞에 0을 붙여줌
    const format = function (time) {
        if (time < 10) {
            return '0' + time;
        } else {
            return time;
        }
    }

    // ]----------------------------------------------> remaining값은 남은 시간을 초로 계산한 값이기에 이 값을 (일,시,분,초)로 만듦
    const remainingObj = {
        remainingDate: Math.floor(remaining / 3600 / 24),
        remainingHours: Math.floor(remaining / 3600) % 24,
        remainingMin: Math.floor(remaining / 60) % 60,
        remainingSec: Math.floor(remaining) % 60
    }

    // ]----------------------------------------------> 일, 시, 분, 초 TEXT값을 변환
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



//==========================>[ 카운트를 시작시키는 함수  ]<=============================

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

//=========================>[ setClearInterval 기능을 하는 함수  ]<===========================

const setClearInterval = function () {
    localStorage.removeItem('saved-date');
    for (let i = 0; i < intervalIdArr.length; i++) {
        clearInterval(intervalIdArr[i]);
    }
}

//=======================>[ 타이머 초기화 기능을 하는 함수  ]<============================

const resetTimer = function () {
    container.style.display = 'none';
    messageContainer.innerHTML = '<h3>D-Day를 입력해 주세요.</h3>';
    messageContainer.style.display = 'flex';
    setClearInterval()
}

//=============================>[ 전역변수 2 : 데이터가 브라우저에 있을 경우  ]<============================

if (savedDate) {
    starter(savedDate);
} else {
    container.style.display = 'none';
    messageContainer.innerHTML = '<h3>D-Day를 입력해 주세요.</h3>';
}