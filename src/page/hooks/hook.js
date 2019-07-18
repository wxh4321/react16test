/*
 * @Author: wxh4321
  * @Date: 2019-07-18 11:31:03
 * @Last Modified by: wxh4321
 * @Last Modified time: 2019-07-18 11:43:52
  */
 import { useReducer } from "react";
//描述行为还是通过变量声明出来，一旦描述行为多的话，也可以在新建一个action_type文件来存放
const INCREMENT = "INCREMENT";//+1
const DECREMENT = "DECREMENT";//-1

export const useIndexState = () => {
   const reducer = (state, action) => {
        switch (action.type) {
            case INCREMENT: return state + 1;
            case DECREMENT: return state - 1;
            default: return state;
        }
    }
    
    const incerment = () => dispath({
        type: INCREMENT
    });
    
    const decrement = () => dispath({
        type: DECREMENT
    });
    
    const [count, dispath] = useReducer(reducer, 0);
  
    //模仿hook的定义方式，我们返回的一个时状态值，第二个对象里包含改变状态的函数
    return [count, { incerment,decrement}]
}
