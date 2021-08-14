let goBtn = document.querySelector('.check');
let inputVal = document.querySelector('.input');
let btnCheck = document.querySelector('.btn-check');
let outDiv = document.querySelector('.result');

// let palindromeDiv = document.querySelector('.container')

// let dateInput = inputVal.value;

// btnCheck.addEventListener('click',checkPalindrome);

function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfChar = listOfChars.reverse().join('');
    return reverseListOfChar;
    
}


function checkPalindrome(str){
   var reverse = reverseStr(str)
   if (reverse == str){
       return true;
   }
   else{
       return false;
   }
}



function convertDateToStr(dateObject){
    let dateStr = { day: '', month:'', year:''};
    if(dateObject.day < 10){
        dateStr.day = '0'+ dateObject.day;
    }
    else{
        dateStr.day = dateObject.day.toString();
    }
    if(dateObject.month<10){
        dateStr.month = '0' + dateObject.month;
    }
    else{
        dateStr.month = dateObject.month.toString()
    }
    dateStr.year = dateObject.year.toString();
    return dateStr;
}

function getAllDateFormat(dateObject){
    let dateStr = convertDateToStr(dateObject);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function isPalindromeForAllDateFormat(dateObject){
    let listOfDateFormat = getAllDateFormat(dateObject);
    let isPalindrome = false;

    for(i=0; i<listOfDateFormat.length ; i++){
        if(checkPalindrome(listOfDateFormat[i])){
            isPalindrome = true;
            break;
        }
    }

    return isPalindrome;
}

function leapYear(year){
    if (year%400 === 0 || year%4 === 0){
        return true;
    }
    if(year%100 ===0){
        return false;
    }
    return false;
}

function incrementDate(dateObject){
    let day = dateObject.day + 1;
    let month = dateObject.month;
    let year = dateObject.year;

    let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]

    if(month === 2){
        if(leapYear(year)){
            if(day>29){
                day = 1;
                month += 1;
            }
        }
        else{
            if(day>28){
                day=1;
                month+=1;
            }
        }
    }
    else{
        if(day > daysInMonth[month-1]){
            day = 1;
            month += 1;
        }
    }

    if(month>12){
        month=1;
        year+=1;
    }

    return {
        day : day,
        month: month,
        year: year
    }
    
}

function nextPalindromeDate(dateObject){
    let count =0;
    let nextDate = incrementDate(dateObject);

    while(1){
        count++;
        let isPalindrome = isPalindromeForAllDateFormat(dateObject);
        if(isPalindrome){
            break;
        }
        nextDate = incrementDate(dateObject)
    }

    return [count , nextDate]

}

let dateObject = {
    day : 4,
    month: 1,
    year: 2020
}

console.log(nextPalindromeDate(dateObject))

function clickHandler(e){

    let bdayDate = inputVal.value;

    if(bdayDate !==''){
        let dateList = bdayDate.split('-')
        let dateObject = {
            day : Number(dateList[2]),
            month: Number(dateList[1]),
            year: Number(dateList[0])
        }

        let isPalindrome = isPalindromeForAllDateFormat(dateObject);
        console.log(isPalindrome)

        if(isPalindrome){
            outDiv.innerHTML = `<p>Yayy! your birthday is a palindrome.</p>`
        }

        else{
            let [count , nextDate] = nextPalindromeDate(dateObject);
            outDiv.innerHTML = `<p> Oops! birthdate is not a palindrome.The next palindrome date is 
            x </p>`
        }
    }

}

btnCheck.addEventListener('click',clickHandler)







