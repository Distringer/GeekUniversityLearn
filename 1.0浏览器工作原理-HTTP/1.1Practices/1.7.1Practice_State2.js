/**
 * 
 * 使用状态机实现 判断一段字符串中是否包含'abcabx';
 * 
 */

 console.log(matchStr('werabcdefgoot')); // false
 console.log(matchStr('werabcabxot')); // true
 
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
    if(character == 'x'){
        return end;
    }else{
        return fundB(character);
    }
}
 
function end(character){
     return end;
 }
 
 