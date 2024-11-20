const inputslider=document.querySelector("[data-lengthSlider]");
const lengthdisplay=document.querySelector("[data-lengthNumber]");

const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
//const lowercaseCheck=document.querySelector("[#lowercase]");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allcheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols='!@#$%^&*()_+{}:"<\|';

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
setIndicator("#ccc");

function handleSlider(){
    inputslider.value=passwordLength;
    lengthdisplay.innerText=passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor=color;

}

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min)) +min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt[randNum];
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="failed";
    }

    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);  
}


function shufflepassword(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>
    (str=str+el)    
)
return str;
}


function handleCheckBoxCHange(){
    checkCount=0;
    allcheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    })

    if(passwordLength < checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

}

allcheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxCHange);
})

inputslider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    copyContent();
})

generateBtn.addEventListener('click',()=>{
    if(checkCount==0)
    return;

    if(passwordLength < checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    password="";

    // if(uppercaseCheck.checked){
    //     password=password+generateUppercase();
    // }
    // if(lowercaseCheck.checked){
    //     password=password+generateLowercase();
    // }
    // if(numbersCheck.checked){
    //     password=password+generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password=password+generateSymbol();
    // }

    let funArr=[];

    if(uppercaseCheck.checked){
        funArr.push(generateUppercase)
    };

    if(lowercaseCheck.checked){
        funArr.push(generateLowercase)
    };

    if(numbersCheck.checked){
        funArr.push(generateRandomNumber)
    };
    if(symbolsCheck.checked){
        funArr.push(generateSymbol)
    };

    for(let i=0;i<funArr.length;i++){
        password=password+funArr[i]();
    }

    for(let i=0;i<passwordLength-funArr.length;i++){
        let randIndex=getRndInteger(0,funArr.length);
        password=password+funArr[randIndex]();
    }

    password=shufflepassword(Array.from(password));


    passwordDisplay.value=password;

    calcStrength();
});