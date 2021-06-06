/**
 * 
 * 使用状态机，结合KMP算法。
 * 实现目标字符串中的匹配任意字符串。
 * 
 */

class KMPStateMachine {
    constructor(pattern){
        this.currentstate = null;
        this.pattern = pattern;

        this.stateEnd = this.stateEnd.bind(this);
        this.generateKMPNextTable = this.generateKMPNextTable.bind(this);
        this.generateStateFuncs = this.generateStateFuncs.bind(this);

        this.table = this.generateKMPNextTable(pattern);
        this.stateFuncs = this.generateStateFuncs(this.pattern, this.table);
    }

    stateEnd(){
        return this.stateEnd;
    }

    generateKMPNextTable(pattern){
        let table = new Array(pattern).fill(0);
        
        table[0] = -1;
        let i = 1;
        let j = 0;

        while(i < pattern.length){
            if(pattern[i] === pattern[j]){
                ++j, ++i;
                table[i] = j;
            }else{
                if(j > 0){
                    j = table[j];
                }else{
                    ++i;
                }
            }
        }

        // 保持数组不超过pattern长度，对计算无影响，只是符合next的长度规范
        return table.slice(0, pattern.length);
    }

    generateStateFuncs(pattern, kmpTable){
        let {length} = pattern;
        let stateFuncs = new Array(length);

        for(let i = 0; i < length; i++){
            stateFuncs[i] = char => {
                if(char === pattern[i]){
                    let next = i + 1;
                    // 向后匹配，如果next索引越界，则状态调整为终止态
                    return next === length ? this.stateEnd : stateFuncs[next];
                }else{
                    // 向前回溯，根据KMP nextTable 获取可以回溯的上一个状态，直至初始状态
                    return i > 0 ? stateFuncs[kmpTable[i]](char) : stateFuncs[0];
                }
            }
        }

        return stateFuncs;
    }

    match(str){
        this.currentState = this.stateFuncs[0];
        for(let char of str){
            this.currentState = this.currentState(char);
        }
        let matched = this.currentState === this.stateEnd;
        this.currentState = null;
        return matched;
    }
}

const kmpMachine = new KMPStateMachine('abababx');
console.log(kmpMachine.match('aaaaabababxssss'));