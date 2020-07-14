//jshint esversion:6

const body = document.querySelector('body');
const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');

const unitTexts = document.querySelectorAll('.unit-text');
const spinners = document.querySelectorAll('.spinner');

const milliseconds = 1000;
const hoursPerDay = 24;
const minutesPerHour = 60;
const secondsPerMinute = 60;

const pics = ['./pics/new-year-pic-1.jpg',
              './pics/new-year-pic-2.jpg',
              './pics/new-year-pic-3.jpg',
              './pics/new-year-pic-4.jpg',
              './pics/new-year-pic-5.jpg',
              './pics/new-year-pic-6.jpg',
              './pics/new-year-pic-7.jpg'];


function updateTime() {
    const currentTime = new Date();
    // console.log(currentTime);
    const nextYear = currentTime.getFullYear() + 1;
    const newYearTime = new Date(nextYear,0,1,0);
    // console.log(newYearTime);
    // console.log(newYearTime - currentTime);

    const timeDiff = newYearTime - currentTime;

    const daysLeft = Math.floor(timeDiff / milliseconds / secondsPerMinute / minutesPerHour / hoursPerDay);
    const hoursLeft = Math.floor(timeDiff / milliseconds / secondsPerMinute / minutesPerHour) % hoursPerDay;
    const minutesLeft = Math.floor(timeDiff / milliseconds / secondsPerMinute) % minutesPerHour ;
    const secondsLeft = Math.floor(timeDiff / milliseconds) % secondsPerMinute;

    var d = convertTime(daysLeft);
    var h = convertTime(hoursLeft);
    var m = convertTime(minutesLeft);
    var s = convertTime(secondsLeft);

    days.innerHTML = d;
    hours.innerHTML = h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;
}

function convertTime(t) {
    var time;
    if (t >= 10) {
        return JSON.stringify(t);
    } else {
        time = '0' + JSON.stringify(t);
        return time;
    }
}

function changePic() {
    var i = Math.floor(Math.random() * pics.length);
    var pic = pics[i];
    body.style.backgroundImage = 'url(' + pic + ')';
}

function removeSpinners() {
    unitTexts.forEach( test => {
        test.classList.remove('hidden');
    });

    spinners.forEach( spinner => {
        spinner.classList.toggle('hidden');
    });
}

window.onload = () => {
    setTimeout(removeSpinners, 1000);
    setInterval(updateTime,1000);
    setInterval(changePic, 6000);
};
