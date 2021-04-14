function findWantStr(sourceStr, wantStr){
  const index = sourceStr.indexOf(wantStr);
  if(index < 0) {
    console.log(`'${sourceStr}'中不存在'${wantStr}'字符`); 
    return index;           
  }
  console.log(`'${wantStr}'为'${sourceStr}'的第${index+1}个字符`);
  return index;
}

function main() {
    findWantStr('sdadddb','ab');
};

main();
