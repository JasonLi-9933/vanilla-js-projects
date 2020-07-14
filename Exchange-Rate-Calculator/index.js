//jshint esversion:6

const currency1 = document.querySelector('#currency1-box');
const currency2 = document.querySelector('#currency2-box');
const swapBtn = document.querySelector('.swap-btn');
const value2 = document.querySelector('.value2');

const baseText = document.querySelector('.base-text');
const rate = document.querySelector('.rate');
const targetText = document.querySelector('.target-text');



var baseCurrency = 'CNY',
    targetCurrency = 'CAD';


window.onload = () => {
    updateRate(baseCurrency, targetCurrency);

    currency1.addEventListener('change', (e) => {
        baseCurrency = e.target.value;
        updateRate(baseCurrency, targetCurrency);
    });

    currency2.addEventListener('change', (e) => {
        targetCurrency = e.target.value;
        updateRate(baseCurrency, targetCurrency);
    });

    swapBtn.addEventListener('click', () => {
        /* Before Swap */
        document.querySelector('#currency1-box .' + baseCurrency).removeAttribute('selected');
        document.querySelector('#currency2-box .' + targetCurrency).removeAttribute('selected');
        /* Swapping */
        var temp = baseCurrency;
        baseCurrency = targetCurrency;
        targetCurrency = temp;
        updateRate(baseCurrency, targetCurrency);
        /* After Swap*/
        document.querySelector('#currency1-box .' + baseCurrency).setAttribute('selected','');
        document.querySelector('#currency2-box .' + targetCurrency).setAttribute('selected','');
    });
};



function updateRate(base, target) {
    var baseValue, targetValue;
    var API = 'https://v6.exchangerate-api.com/v6/e46f01e342885def08863427/latest/USD';

    fetch(API)
    .then( data => {
        return data.json();
    })
    .then( data => {
        // console.log(data.conversion_rates);
        const rates = data.conversion_rates;
        baseValue = rates[base];
        targetValue = rates[target];

        rate.innerHTML = (targetValue / baseValue).toFixed(5);
        baseText.innerHTML = base;
        targetText.innerHTML = target;
        value2.innerHTML = (targetValue / baseValue).toFixed(2);
    });
}