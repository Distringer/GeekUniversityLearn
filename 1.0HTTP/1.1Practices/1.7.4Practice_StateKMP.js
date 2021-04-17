/**
 * 
 * 使用状态机，结合KMP算法。
 * 实现目标字符串中的匹配任意字符串。
 * 
 */
function match(string, pattern){
    const state = new MatchState(pattern);
    
    for(let c of string){
        state.receiveChar(c);
    }

    return state.isMatch();
}

class MatchState {
    constructor(pattern){
        this.pattern = pattern;
        // 当前状态，也是当前 pattern 中当前字符的位置
        this.current = 0;
        // 完成状态，当最后一个字符也匹配成功时，说明匹配成功
        this.MATCH_COMPLETE = this.pattern.length;
        // 生成 KMP table
        this.kmpTable = this._generateKmpTable(pattern);
    }

    isMatch(){
        return this.current === this.MATCH_COMPLETE;
    }

    receiveChar(char){
        if(this.current === this.MATCH_COMPLETE) return; // 匹配完成 直接返回

        // 相等进入下一状态
        if(char === this.pattern[this.current]){
            this.current++;
            return;
        }

        // 不相等 回退
        if(this.current > 0){
            this.current = this.kmpTable[this.current];
            this.receiveChar(char);
        }
    }
    _generateKmpTable(pattern){
        const table = Array(pattern.length).fill(0);

        let i = 1, j = 0;
        while(i < table.length){
            if(pattern[i] === pattern[j]){
                ++i;
                ++j;
                if(i < table.length){
                    table[i] = j;
                }
            }else{
                if(j > 0){
                    j = table[j]; // 回退
                }else{
                    ++i;
                }
            }
        }
        return table;
    }
}

console.log(match('abcabcabxdef', 'abcabx'));