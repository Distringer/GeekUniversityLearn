/**
 * 
 * 使用状态机实现 判断一段字符串中是否包含'abcdef';
 * 
 */

console.log(matchStr('werabcdefgoot')); // true
console.log(matchStr('werabdefgoot')); // false

/**
 * 判断目标字符串是否包含'abcdef'字符串。
 * @param {*} pointStr 目标字符串
 */
function matchStr(pointStr){
    let state = start;
    for(let character of pointStr){
        state = state(character);
    }
    return state == end;
}

function start(character){
    if(character == 'a'){
        return fundA;
    }else{
        return start;
    }
}

function fundA(character){
    if(character == 'b'){
        return fundB;
    }else{
        return start(character);
    }
}

function fundB(character){
    if(character == 'c'){
        return fundC;
    }else{
        return start(character);
    }
}

function fundC(character){
    if(character == 'd'){
        return fundD;
    }else{
        return start(character);
    }
}

function fundD(character){
    if(character == 'e'){
        return fundE;
    }else{
        return start(character);
    }
}

function fundE(character){
    if(character == 'f'){
        return end;
    }else{
        return start(character);
    }
}

function end(character){
    return end;
}

