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

const handleShowModel = (disp='block') => {
    document.getElementById('modelCard').style.display = disp;
}

window.onload = () => {
    if(!getCookie('signUpFormData')){
        setTimeout(() => {
            handleShowModel()
        }, 5000)
    }
};

document.getElementById('signUpForm').addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.target);
    var result = convertArrayToObject([...data.entries()]);
    setCookie('signUpFormData', JSON.stringify(result), 1)
})