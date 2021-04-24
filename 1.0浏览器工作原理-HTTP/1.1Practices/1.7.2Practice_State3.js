/**
 * 
 * 使用状态机实现 判断一段字符串中是否包含'abababx';
 * 
 */

 console.log(matchStr('werabcdefgoot')); // false
 console.log(matchStr('sababababababacbababababxd')); // true
 
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
     if(character == 'a'){
         return fundA2;
     }else{
         return start(character);
     }
 }

 function fundA2(character){
    if(character == 'b'){
        return fundB2;
    }else{
        return start;
    }
}

function fundB2(character){
    if(character == 'a'){
        return fundA3;
    }else{
        return start(character);
    }
}

function fundA3(character){
    if(character == 'b'){
        return fundB3;
    }else{
        return start;
    }
}

function fundB3(character){
    if(character == 'x'){
        return end;
    }else{
        return fundB2(character);
    }
}
 
function end(character){
     return end;
 }
 
 