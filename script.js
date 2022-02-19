// Used DRY principle
'use strict';

//Data
const account1 = {
    owner: 'Elbek Khatanboyev',
    movements: [2000,4500,-2500,9000,1300,-2800,4000,530],
    interstRate: 1.2, // %
    pin: 1111,

    movementsDate: [
        '2021-11-24T10:02:23.517Z',
        '2021-08-16T17:49:18.517Z',
        '2021-10-02T06:32:03.517Z',
        '2021-11-12T09:41:21.517Z',
        '2021-04-01T11:24:19.517Z',
        '2021-05-17T03:19:14.517Z',
        '2021-05-02T12:09:42.517Z',
        '2022-02-09T13:21:49.517Z'
    ]
};

const account2 = {
    owner: 'Jessica Devis',
    movements: [3500,1700,-2500,4200,2300,-2900],
    interstRate: 1.5, // %
    pin: 2222,

    movementsDate: [
        '2021-10-02T06:32:03.517Z',
        '2021-11-12T09:41:21.517Z',
        '2021-04-01T11:24:19.517Z',
        '2021-05-17T03:19:14.517Z',
        '2021-05-02T12:09:42.517Z',
        '2021-05-02T12:09:42.517Z'
    ]
};

const account3 = {
    owner: 'Steven Williams',
    movements: [1200,1350,-2100,5600,8200,-4200],
    interstRate: 0.7, // %
    pin: 3333,

    movementsDate: [
        '2022-01-03T13:21:49.517Z',
        '2021-11-24T10:02:23.517Z',
        '2021-08-16T17:49:18.517Z',
        '2021-10-02T06:32:03.517Z',
        '2021-11-12T09:41:21.517Z',
        '2021-04-01T11:24:19.517Z'
    ]
};

const account4 = {
    owner: 'Alen Walker',
    movements: [820,1670,3000,11000,-3200,-2130],
    interstRate: 0.9, // %
    pin: 4444,

    movementsDate: [
        '2021-11-24T10:02:23.517Z',
        '2021-08-16T17:49:18.517Z',
        '2021-10-02T06:32:03.517Z',
        '2021-11-12T09:41:21.517Z',
        '2021-04-01T11:24:19.517Z',
        '2021-05-17T03:19:14.517Z'
    ]
}

// Accounts
const accounts = [account1, account2, account3, account4];

// Variables
const ContainerApp = document.querySelector('.app'); // Container app
const movements = document.querySelector('.movements'); //Movements group
const containerMovement = document.querySelector('.movements-row'); //Movements item
const overalBalance = document.querySelector('.balance-amount-value'); //Overal balanse
const depositSum = document.querySelector('.overal-deposits-value'); //Colculating deposit sum
const withdrawalSum = document.querySelector('.overal-withdrawal-value'); //Colculating withdrawal sum
const interestSum = document.querySelector('.overal-interests-value'); //Colculating interest balance
const usernameButton = document.querySelector('.user_button'); //Login user
const pinButton = document.querySelector('.pin_button');
const userSubmitButton = document.querySelector('.submit_button'); 
const welcome = document.querySelector('.welcome'); //Wecome back, user
const transferAcc = document.querySelector('.transfer-account'); //Transfer balance to another account 
const transferAmount = document.querySelector('.transfer-amount');
const transferSubmit = document.querySelector('.transfer-submit');
const closeAccSubmit = document.querySelector('.close-account-submit'); //Close account
const closeAccPin = document.querySelector('.close-account-pin');
const closeAccUsername = document.querySelector('.close-account-username');
const loanSubmit = document.querySelector('.loan-submit'); //Getting loan from bank
const loanAmount = document.querySelector('.loan-amount');
const sortBalance = document.querySelector('.sort-balance-btn'); //Sorting balance
const movementDateValue = document.querySelector('.m ovement-date-value'); //Movement date
const counterLogout = document.querySelector('.couter-logged-value'); //Logged out time

//Format movements date
const formatMovementsDate = function(date) {
    const calcDaysPassed = (date1,date2) => Math.round((Math.abs(date2-date1))/(1000*60*60*24));

    const dayPassed = calcDaysPassed(new Date(), date);
    if(dayPassed === 0){
        return 'Today';
    }
    if(dayPassed === 1) {
        return 'Yesterday';
    }
    if(dayPassed <= 7) {
        return `${dayPassed} days ago`;
    }
    else {
        const option = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        }
        return new Intl.DateTimeFormat('en-UK', option).format(date);
    }
}

// Display movements
const displayMovements = (acnt, sort=false) => {
    containerMovement.innerHTML = '';

    //Sorting movements
    const movs = sort ? acnt.movements.slice('0').sort((a,b) => a-b):acnt.movements;

    movs.forEach(function(val, i){
        const amountType = val > 0 ? 'depozit':'withdrawal';

        //Movements date
        const date = new Date(acnt.movementsDate[i]);
        const displayDate = formatMovementsDate(date);

        const MovementItem = `
            <div class="movement-item">
                <div class="movement-type">
                    <p class="movement-type-${amountType}"><span class="movement-index">${i+1}</span> ${amountType}</p>
                </div>
                <div class="movement-date">
                    <small class="movement-date-value">${displayDate}</small>
                </div>
                <div class="movement-value">
                    <h3 class="movement-value-amount">$${Math.abs(val).toFixed(1)}</h3>
                </div>
            </div>`;

       containerMovement.insertAdjacentHTML('afterbegin', MovementItem);
    })
}

//Create username
const createUsername = (accs) => {
    accs.forEach((acc)=> {
        acc.username = acc.owner.toLowerCase().split(' ').map(function(name){
            return name[0]
        }).join('');
    });
}
createUsername(accounts);

//Calculating overal balance
const calcOveralBalance = function(acnt){
    acnt.balance = acnt.movements.reduce(function(acc,val,i,arr){
        return acc + val;
    },0);

    overalBalance.innerHTML = (acnt.balance).toFixed(1);
}

//Overal balance summary
const overalBalanceSummary = (acnt) => {
    const depositSummary =  acnt.movements
                                     .filter(item => item > 0)
                                     .reduce((acc,val) => acc+val,0);
    const withdrawalSumnary = acnt.movements.
                                        filter(item => item < 0)
                                        .reduce((acc,val) => acc+val,0);
    const interestSummary = acnt.movements
                                     .filter(item => item > 0)
                                     .map(item => item * (acnt.interstRate)/100)
                                     .filter((val,i,arr) => val >= 1)
                                     .reduce((acc,val)=> acc+val,0);
    depositSum.innerHTML = `$${depositSummary.toFixed(1)}`;
    withdrawalSum.innerHTML = `$${(Math.abs(withdrawalSumnary).toFixed(1))}`;
    interestSum.innerHTML = `$${interestSummary.toFixed(1)}`;
}

const update = (acnt) => {
    //Display movements
    displayMovements(acnt);

    //Display balance
    calcOveralBalance(acnt);

    //Display Summary
    overalBalanceSummary(acnt);
}

//counter Logout section
function logoutInterval() {
    let time = 120;

    function tick() {
        let minut = String(Math.trunc(time/60)).padStart(2,0);
        let second = String(time%60).padStart(2,0);
        counterLogout.innerHTML = `${minut}:${second}`;

        if(time === 0){
            clearInterval(funcInterval);
            welcome.innerHTML = 'Log in to get started';
            ContainerApp.style.opacity = '0';
        }

        time--;
   }

    const funcInterval = setInterval(tick,1000);
    return funcInterval;
}

//Login section
let currentAccount,timer;
userSubmitButton.addEventListener('click', function(e){
    e.preventDefault();
    currentAccount = accounts.find(acc => acc.username === usernameButton.value);
    
    if(currentAccount?.pin === +pinButton.value){
        ContainerApp.style.opacity = '1';
        usernameButton.value = pinButton.value = null;
        pinButton.blur();

        //Welcome back, user
        welcome.innerHTML =`Welcome back, ${currentAccount.owner.split(' ')[0]}`;

        //Getting current date
        const now = new Date();
        const options = {
            month: 'short',
            year: 'numeric',
            day: 'numeric'
        };

        setInterval(func,1000);
        function func(){
            const nowTime = new Date().toLocaleTimeString();
            document.querySelector('.date').innerHTML = `${new Intl.DateTimeFormat('en-UK',options).format(now)}, ${nowTime}`;
        }

        //Update data
        update(currentAccount);

        if(timer) {
            clearInterval(timer)
        }
        timer = logoutInterval();
    }
});

//Transfer Amount section
transferSubmit.addEventListener('click', function(e){
    e.preventDefault();
    const amount = +transferAmount.value;
    const receiverAcc = accounts.find(acnt => acnt.username === transferAcc.value);

    transferAcc.value = transferAmount.value = null;
    transferAmount.blur();
    if(amount>0 && receiverAcc 
        && currentAccount.balance > amount 
        && receiverAcc?.username !== currentAccount.username){
            setTimeout(() => {
                currentAccount.movements.push(-amount);
                receiverAcc.movements.push(amount);
                currentAccount.movementsDate.push(new Date().toISOString());
                receiverAcc.movementsDate.push(new Date().toISOString());

                //Updates data
                update(currentAccount);

                if(timer){
                    clearInterval(timer);
                }
                timer = logoutInterval();
            }, 2000);
    }
});

//Close account
closeAccSubmit.addEventListener('click', function(e){
    e.preventDefault();

    if(currentAccount.pin === +closeAccPin.value 
       && currentAccount.username === closeAccUsername.value) {
           let index = accounts.findIndex(acc => acc === currentAccount);
           accounts.splice(index,1);
           
           //Hidden Container app
           ContainerApp.style.opacity = '0';
    }
});

//Loan deposit from bank
loanSubmit.addEventListener('click', function(e){
    e.preventDefault();

    const loanValue = +loanAmount.value;
    if(loanValue > 0 && currentAccount.movements.some(val => val >= loanValue * 0.1)){
       setTimeout(() => {
        currentAccount.movements.push(loanValue);
        currentAccount.movementsDate.push(new Date().toISOString());

        //Updates data
        update(currentAccount);

        if(timer){
            clearInterval(timer);
        }
        timer = logoutInterval();
       },2000);
    }

    loanAmount.value = '';
    loanAmount.blur();
});