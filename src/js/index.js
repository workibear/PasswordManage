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
    document.getElementById("result").value = randomString(len, symbol, hash.toString());
    console.log(randomString(len, symbol, hash.toString()))
    return false;
}

function randomString(leng, charSet, hash) {
    charSet = charSet + 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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