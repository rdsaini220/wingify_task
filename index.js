function getCookie(cookieName) {
    if(Array.isArray(cookieName)) {
      const result = {}
      const cookieRows = document.cookie.split('; ')
      cookieName.forEach(name => {
        const value = cookieRows
          .find(row => row.startsWith(`${name}=`))
          ?.split('=')[1]
        if (value) result[name] = value
      })
      return result
    }
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(`${cookieName}=`))
      ?.split('=')[1]
}
  
function setCookie(name, value, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";path=/;" + expires;
}

const convertArrayToObject = (array) => {
    var obj = {};
    for (var i = 0; i < array.length; i++) {
        var key = array[i][0];
        var value = array[i][1];
        obj[key] = value;
    }
    return obj;
}

const handleCloseModel = (disp='none') => {
    document.getElementById('modelCard').style.display = disp;
    setCookie('onClose', 'yes', 1)
}

const createModel = () => {
    const modelStyle = `
        .popup-body{
            font-family: 'Roboto', sans-serif;
            width: 100%;
            height: 100vh;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
        }
        .popup-body .popup-card{
            display: block;
            overflow: hidden;
            width: 75%;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: #fbd405;
            padding: 50px;
        }
        .popup-body .text-normal{
            font-weight: 400;
        }
        .popup-body .text-center{
            text-align: center;
        }
        .popup-body .row{
            display: flex;
            width: 100%;
        }
        .popup-body .d-flex{
            display: flex;
        }
        .popup-body .justify-content-center{
            justify-content: center;
        }
        .popup-body .align-items-center{
            align-items: center;
        }
        .popup-body .col{
            flex-basis: 50%;
        }
        .popup-body .heading-text{
            font-size: 30px;
        }
        .popup-body .sale-img{
            position: relative;
        }
        .popup-body .input-group{
            width: 100%;
            overflow: hidden;
            margin-bottom: 15px;
        }
        .popup-body .form-input{
            width: calc(100% - 44px);
            height: 48px;
            padding: 2px 20px;
            border: solid #ccc 1px;
            border-radius: 2px;
        }
        .popup-body .form-input:focus{
            outline: solid 1px #000;
        }
        .errorText{
            font-size:14px;
            color: red;
            padding-left:4px;
        }
        .popup-body .check-group-top{
            margin-bottom: 15px;
        }
        .popup-body .check-group{
            display: flex;
            align-items: center;
        }
        .popup-body .form-check{
            width: 24px;
            height: 24px;
        }
        
        .popup-body .btn{
            width: 100%;
            height: 48px;
            background: #000;
            border: solid 2px #000;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
        }
        .popup-body .btn:hover{
            background: #fff;
            color: #000;
        }
        
        .popup-body .close {
            position: absolute;
            right: 32px;
            top: 32px;
            width: 32px;
            height: 32px;
            cursor: pointer;
        }
        .popup-body .close:before, .close:after {
            position: absolute;
            left: 15px;
            content: ' ';
            height: 33px;
            width: 2px;
            background-color: #000;
        }
        .popup-body .close:before {
            transform: rotate(45deg);
        }
        .popup-body .close:after {
            transform: rotate(-45deg);
        }
        
        .popup-body .link-text{
            color: #000;
            padding-top: 5px;
            display: inline-block;
            text-transform: uppercase;
        }
        .popup-body .w-100{
            width: 100%;
        }
        
        @media (max-width: 768px){
            .popup-body .popup-body{
                height: auto;
            }
            .popup-body .row{
                flex-direction: column;
            }
            .popup-body .popup-card{
                width: 65%;
            }
            .popup-body .heading-text{
                font-size: 28px;
            }
            .popup-body .close{
                top: 20px;
            }
            .popup-body .sale-img{
                display: none;
            }
        }
    `;
    const modelHtml = `
        <div class="popup-body" id="modelCard">
            <div class="popup-card">
                <div class="close" onclick="handleCloseModel()"></div>
                <div class="row align-items-center">
                    <div class="col">
                        <div class="content-card">
                            <h1 class="text-center heading-text">GET $10 OFF WHEN YOU SIGN UP FOR <br>
                                <span class="text-normal">GET $10 OFF WHEN YOU SIGN UP FOR</span>
                            </h1>
                            <form action="#" id="signUpForm" onsubmit="handleSubmit(event)">
                                <div class="input-group">
                                    <input class="form-input" type="text" name="name" onchange="validateInput('name', 'nameError', 'Please enter a valid name.')" id="name" placeholder="your name">
                                    <span class="errorText" id="nameError"></span>
                                </div>
                                <div class="input-group">
                                    <input class="form-input" type="text" name="email" onchange="validateEmail('email', 'emailError', 'Please enter a valid email address.', 'email')" id="email" placeholder="Email Address">
                                    <span class="errorText" id="emailError"></span>
                                </div>
                                <div class="check-group-top">
                                    <div class="check-group">
                                        <input class="form-check" type="checkbox" name="newsletter" onchange="validateInput('newsletter', 'newsletterError', 'Please agree to the terms and conditions.')" id="newsletter" id="newsletter">
                                        <label class="form-check-text" for="newsletter">Check this box to recevie monthly newsletter.</label>
                                    </div>
                                    <span class="errorText" id="newsletterError"></span>
                                </div>
                                <div class="text-center"> 
                                    <button type="submit" class="btn">SIGN UP</button>
                                    <a href="#" class="link-text">privacy policy</a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col d-flex justify-content-center m-d-none">
                        <div class="sale-img">
                            <img class="w-100" src="./offerx500.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    var styleElement = document.createElement('style')
    styleElement.textContent = modelStyle;
    document.head.appendChild(styleElement)
    document.body.innerHTML = modelHtml
}

function detectMob() {
    return (window.innerWidth < 768);
}

function validateForm() {
    var isValidName = validateInput('name', 'nameError', 'Please enter a valid name.');
    var isValidEmail = validateEmail('email', 'emailError', 'Please enter a valid email address.');
    var isValidAgree = validateCheckbox('newsletter', 'newsletterError', 'Please agree to the terms and conditions.');
    return isValidName && isValidEmail && isValidAgree;
}

function validateInput(inputId, errorId, errorMessage) {
    var input = document.getElementById(inputId).value;
    var errorSpan = document.getElementById(errorId);
    if(input.trim() === '') {
        errorSpan.textContent = errorMessage;
        return false;
    } else {
        errorSpan.textContent = '';
        return true;
    }
}

function validateEmail(emailId, errorId, errorMessage) {
    var email = document.getElementById(emailId).value;
    var errorSpan = document.getElementById(errorId);
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        errorSpan.textContent = errorMessage;
        return false;
    } else {
        errorSpan.textContent = '';
        return true;
    }
}

function validateCheckbox(checkboxId, errorId, errorMessage) {
    var checkbox = document.getElementById(checkboxId);
    var errorSpan = document.getElementById(errorId);

    if (!checkbox.checked) {
        errorSpan.textContent = errorMessage;
        return false;
    } else {
        errorSpan.textContent = '';
        return true;
    }
}

const handleSubmit = (e) => {
    if (!validateForm()) {
        e.preventDefault();
        var nameValue = document.getElementById('name').value;
        var emailValue = document.getElementById('email').value;
        var newsletterValue = document.getElementById('newsletter').value;
        isValidName(nameValue)
        if( emailValue !== '' && newsletterValue !== '') {        
            const data = new FormData(e.target);
            var result = convertArrayToObject([...data.entries()]);
            setCookie('signUpFormData', JSON.stringify(result), 1)
            handleCloseModel()
        }
    }
}

window.onload = () => {
    if(detectMob()){
        setTimeout(() => {
            if(!getCookie('onClose')){
                createModel()
            }
        }, 5000)
    }else{
        if(!getCookie('onClose')){
            createModel()
        }
    }
};