/**
 * 
 * 在字符串中找到指定字符
 * 
 * @param {*} string 字符串
 * @param {*} character 指定字符
 * @returns index 指定字符的下标
 * 
 */
function findCharacter(string, character){
  for(let index = 1; index < String(string).length; index++){
    if(string[index] === character) return index;
  };
  return -1;
}

/**
 * 
 * 查看字符串的指定下标的字符是否和指定字符相等
 * 
 * @param {*} string 字符串
 * @param {*} index 指定下标
 * @param {*} character 指定字符
 * @returns true|false 相等或不相等
 * 
 */
function strIndexEqualCharacter(string, index, character){
  return index >= 0 && string[index] == character;
}

/**
 * 
 * 从原始字符串指定下标开始，逐一与目标字符串核对。
 * 
 * @param {*} sourceStr 原始字符串
 * @param {*} appointIndex 指定下标
 * @param {*} wantStr 目标字符串
 * @returns true|false 核对成功或失败
 * 
 */
function checkSourceStrWithWantStrStartIndex(sourceStr, appointIndex, wantStr){
  for(let character of wantStr){
    if(!strIndexEqualCharacter(sourceStr, appointIndex++, character)) return false; // 核对失败
  }
  // 所有字符串都核对成功
  return true;
}

/**
 * 
 * 在原始字符串中找到目标字符串
 * 
 * 1. 找到目标字符串第一个字符在原始字符串的下标
 * 2. 从原始字符串指定下标逐一核对目标字符串。
 * 
 * @param {*} sourceStr 原始字符串
 * @param {*} wantStr 目标字符串
 * @returns true|false 找到或未找到
 * 
 */
function findWantStr(sourceStr, wantStr){
  return checkSourceStrWithWantStrStartIndex(sourceStr, findCharacter(sourceStr, wantStr[0]), wantStr);
}

/**
 * 
 * 主函数
 * 
 * 主要用于界面友好化
 * 
 */
function main(sourceStr, wantStr) {
  if(String(wantStr).length === 0 && String(sourceStr).length  === 0){
    console.log(`Tip: 原始字符串与目标字符串都为空, 请输入`);
    return false;
  }
  if(String(wantStr).length === 0){
    console.log(`Tip: 目标字符串为空，请输入`);
    return false;
  }
  if(String(sourceStr).length === 0){
    console.log(`Tip: 原始字符串为空，请输入`);
    return false;
  }
  if(String(wantStr).length > String(sourceStr).length) {
    console.log(`Failed：目标字符串'${wantStr}'长度超过原始字符串长度'${sourceStr}'`);
    return false;
  }
  if(findWantStr(sourceStr,wantStr)){
    console.log(`Success: '${sourceStr}'中存在'${wantStr}'字符`);
    return true;
  }
  console.log(`Failed: '${sourceStr}'中不存在'${wantStr}'字符`);
  return false;
};

/**
 * 
 * unit test
 * 
 * */ 
console.log('------正常路径------------------------------------------');
main('sdabdddb', 'kabcd'); // 找不到第一个字符 Failed
main('sdabdddb', 'dacb'); // 能找到第一个字符，但后续字符串核对不正确 Failed
main('sdabdddb', 'abdd'); // 能找到第一个字符，且后续字符串都核对正确 Success
console.log('------边界测试------------------------------------------');
main('sdabdddb', 'sdabdddbdddddddd'); // 目标字符串长度远超原始字符串长度 Failed
main('sdabdddb', ''); // 目标字符串为空 提示用户 目标字符串为空
main('', '78922ad'); // 原始字符串为空 提示用户 原始字符串为空
main('', ''); // 原始字符串与目标字符串都为空 提示用户 原始字符串与目标字符串都为空
console.log('------运行结束------------------------------------------');

/**
 * const sourceStrObject = new DefinedString(sourceStr);
 * return sourceStrObject.findWantStr(wantStr); true|false
 */
 console.log('------可以将上面的字符串函数进一步抽象为DefinedString类，具体功能实现使用该类对象的方法。-----');