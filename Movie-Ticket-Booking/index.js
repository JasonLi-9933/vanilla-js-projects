//jshint esversion:6

const seats = document.querySelectorAll('.seat');
const movies = document.querySelector('#dropdown');
const quantity = document.querySelector('#quantity');
const total = document.querySelector('#total');
const btn = document.querySelector('.btn');


var seatsCount = 0,
    ticketPrice = 0,
    moneySpend = 0,
    movieSelected = '',
    mySeatIDs = [];

window.onload = () => {
    loadInfo();
    seats.forEach(seat => {
        var isOccupied = seat.classList.contains('occupied');

        if (!isOccupied) {
            seat.addEventListener('click', (e) => {
                var isSelected = seat.classList.contains('selected');
                e.target.classList.toggle('selected');
                updateTicketsNum(isSelected);
            });
        }

    });

    movies.addEventListener('change', (e) => {
        const movie = e.target.value;
        switch (movie) {
            case 'avenger':
                ticketPrice = 12;
                break;
            case 'joker':
                ticketPrice = 8;
                break;
            case 'transformer':
                ticketPrice = 10;
                break;
            case 'fast':
                ticketPrice = 14;
                break;
        }
        localStorage.setItem('movieSelected', movie);
        localStorage.setItem('ticketPrice', ticketPrice);
        updateMsg();
    });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        placeOrder();
    });
};

function updateTicketsNum(isSelected) {
    if (!isSelected) {
        seatsCount += 1;
    } else {
        seatsCount -= 1;
    }
    localStorage.setItem('seatsCount', seatsCount);
    updateMsg();

    const selectedSeats = document.querySelectorAll('.seat.selected');
    mySeatIDs = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('mySeatIDs', JSON.stringify(mySeatIDs));
}


function updateMsg() {
    quantity.innerHTML = seatsCount;
    moneySpend = ticketPrice * seatsCount;
    total.innerHTML = moneySpend;
    localStorage.setItem('moneySpend', moneySpend);
}

function loadInfo() {
    seatsCount = Number(localStorage.getItem('seatsCount'));
    ticketPrice = Number(localStorage.getItem('ticketPrice'));
    moneySpend = Number(localStorage.getItem('moneySpend'));
    movieSelected = localStorage.getItem('movieSelected')
                    ? localStorage.getItem('movieSelected')
                    : movieSelected = 'default';
    mySeatIDs = JSON.parse(localStorage.getItem('mySeatIDs'));
    quantity.innerHTML = seatsCount;
    total.innerHTML = moneySpend;
    document.querySelector('.' + movieSelected).setAttribute('selected', '');

    populateUI(mySeatIDs);
}

function populateUI(selectedSeats) {
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if( selectedSeats.indexOf(index) != -1){
                seat.classList.add('selected');
            }
        });
    }
    
}

function placeOrder() {
    occupySeats();
    localStorage.clear();

    quantity.innerHTML = 0;
    total.innerHTML = 0;

    seatsCount = 0;
    moneySpend = 0;

    seats.forEach( seat => {
        seat.classList.remove('selected');
    });
    alert('Enjoy the movie!');
}

function occupySeats() {
    console.log(mySeatIDs);
    if (mySeatIDs != null ){
        seats.forEach((seat, index) => {
            if(mySeatIDs.indexOf(index) != -1) {
                if (seat.classList.contains('alley')) {
                    seat.className = 'seat occupied alley';
                } else {
                    seat.className = 'seat occupied';
                }
                // seat.removeEventListener();
                
            }
        });
    }
    
}