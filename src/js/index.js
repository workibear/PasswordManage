function mySubmit(form) {
    let formData = new FormData(form);
    const domain = formData.get('domain');
    const password = formData.get('password');
    const hash = CryptoJS.SHA256(domain + password);

    let len = 16;
    if (formData.get('length').length != 0) {
        len = formData.get('length');
    }
    let symbol = "";
    if (formData.get('symbol').length != 0) {
        symbol = formData.get('symbol');
    }

    let result = randomString(len, symbol, hash.toString());
    while(notContains(result)) {
        console.log(result);
        result = randomString(len, symbol, CryptoJS.SHA256(result).toString());
    }
    document.getElementById("result").value = result;
    return false;
}

function randomString(leng, charSet, hash) {
    charSet = charSet + 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~@_/+:';
    let randomString = '';
    let arr = mySplit(hash, 4);
    for (let i = 0; i < leng; i++) {
        let randomPoz = eval(arr[i]).toString(10) % charSet.length;
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}

function mySplit(str, leng) {
    let arr = [];
    let index = 0;
    while (index < str.length) {
        arr.push("0x" + str.slice(index, index += leng));
    }
    return arr;
}

function notContains(str) {
    const number=/\d/;
    const lowerLetter = /[a-z]/;
    const upLetter = /[A-Z]/;
    const char = /[~@_/+:]/;
    return !number.test(str) || !lowerLetter.test(str) || !upLetter.test(str) || !char.test(str);
}
