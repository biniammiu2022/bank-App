class Account {
    static accountInfoList = [];
    #accountName;
    #deposit;
    constructor(accountName,deposit){
        this.#accountName = accountName;
        this.#deposit = deposit;
    }
    createAccount(accountName,deposit){
         this.#accountName = accountName;
         this.#deposit = deposit;
    }
    setAccountName(accountName){
        this.#accountName = accountName;
    }
    setDeposit(deposit){
        this.#deposit = deposit;
    }

    getAccountName(){
        return this.#accountName;
    }
    getDeposit(){
        return this.#deposit;
    }   

}

function localDataToAccount(){
    const accounts = localStorage.getItem('accounts');
    const parseToObj = JSON.parse(accounts);
    //console.log('parse object'+parseToObj);
    //const val = new Account();
    for (let i = 0; i < parseToObj.length; i++) {
        var val = new Account();
        val.setAccountName(parseToObj[i].account);
        val.setDeposit(parseToObj[i].Deposit);
        console.log(parseToObj[i].account);
        Account.accountInfoList.push(val);
    }
    
    console.log(parseToObj);
    console.log(Account.accountInfoList);
}



if(localStorage.getItem('accounts')){
    localDataToAccount();
    //Account.accountInfoList.push(localStorage.getItem('accounts'));
}

function saveToLocal(){
    var accounts = Account.accountInfoList;
    const arr = [];
    for (let i = 0; i < accounts.length; i++) {
        var obj = {};
        obj["account"] = accounts[i].getAccountName();
        obj["Deposit"] = accounts[i].getDeposit();
        arr.push(obj)
    }
    localStorage.setItem('accounts',JSON.stringify(arr));
    
 }

var button = document.getElementById('createe-button').addEventListener("click", newAccount );

function newAccount(e){
var accountName = document.getElementById('accountName').value;
var deposit = document.getElementById('deposit').value;
//var textarea = document.getElementById('accounts');
    const account = new Account();
    account.createAccount(accountName,deposit);
    
   Account.accountInfoList.push(account);
   saveToLocal();
   console.log(Account.accountInfoList);
   
   display();
}

// function saveToLocal(accounts){
//    const obj = [{}];
//    for (let i = 0; i < accounts.length; i++) {
//     obj["account"] = accounts[i].accountName;
//     obj["Deposit"] = accounts[i].deposit;
//    }
   
//    //console.log(Account.accountInfoList);
//    localStorage.setItem('accounts',JSON.stringify(obj));
// }

function display(){
    var accounts = Account.accountInfoList;
    //console.log(accounts);
    var textarea = '';
    for (let i = 0; i < accounts.length; i++) {
        textarea+="Account Name: "+ accounts[i].getAccountName()+ ", " + " Deposit: " + accounts[i].getDeposit()+'\n';
    }
    document.getElementById('accounts').innerHTML = textarea;
}

display();

//route to deposit and debit page
const depositButton = document.getElementById('depositButton').addEventListener('click',depositPage);
const debitButton = document.getElementById('debitButton').addEventListener('click',debitPage);

function depositPage(){
   location.href = "./deposit.html";
}

function debitPage(){
    location.href = "./debit.html"
}

function loadAccounts(){
    const select = document.getElementById('accountList');
    var accounts = Account.accountInfoList;
    for (let i = 0; i < accounts.length; i++) {
        var values = accounts[i].getAccountName();
        //console.log(values);
        const option = document.createElement('option');
        option.value = values;
        option.textContent = values;
       // console.log(option)
        select.appendChild(option);
    }

}

function selecteAccount(){
    var accounts = Account.accountInfoList;
    const selectedAccount = document.getElementById('accountList').selectedIndex;
    if (selectedAccount != 0) {
        // var val = accounts.filter(account => account.getAccountName() == selectedAccount.value)
        // .map(account => account.getDeposit());
        var balance = accounts[selectedAccount-1].getDeposit();
        document.getElementById('curren-balance').innerHTML = `${balance}`;
        //document.getElementById('deposit-balance').removeAttribute('disabled');
    }
    else{
        document.getElementById('curren-balance').innerHTML = '';
        //document.getElementById('deposit-balance').setAttribute('disabled','disabled');
        //alert("Please select account")
    } 
}

function deposit(){
    var accounts = Account.accountInfoList;
    const selectedAccount = document.getElementById('accountList').selectedIndex;
    if(selecteAccount === 0){
        alert("Please select account")
    }
    const inputBalance = document.getElementById('input-depost').value;
    if (selectedAccount != 0 || inputBalance != '' ) {
        var balance = accounts[selectedAccount-1].getDeposit();
        //console.log(parseFloat(inputBalance) + parseFloat(balance));
        accounts[selectedAccount-1].setDeposit(parseFloat(inputBalance) + parseFloat(balance));
        saveToLocal();
        location.href = "./index.html";
    }else{
        alert('Please enter deposit amount' )
    }
}

function debit(){
    console.log("we are here")
    var accounts = Account.accountInfoList;
    const selectedAccount = document.getElementById('accountList').selectedIndex;
    if(selecteAccount === 0){
        alert("Please select account")
    }
    const inputBalance = document.getElementById('input-debit').value;
    if (selectedAccount != 0 || inputBalance != '' ) {
        var balance = accounts[selectedAccount-1].getDeposit();
        if(parseFloat(inputBalance) > parseFloat(balance)){
            alert("your balace is enougn")
        }else{
            accounts[selectedAccount-1].setDeposit(parseFloat(balance)-parseFloat(inputBalance));
            saveToLocal();
            location.href = "./index.html";
        }
        //console.log(parseFloat(inputBalance) + parseFloat(balance));
        
    }else{
        alert('Please enter debit amount' )
    }
}