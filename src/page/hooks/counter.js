/*
 * @Author: wxh4321
  * @Date: 2019-07-18 11:44:32
  * @Last Modified by:   wxh4321
  * @Last Modified time: 2019-07-18 11:44:32
  */
 import React from "react";
import { useIndexState } from "./hook";
export default () => {
    const [count, { incerment, decrement }] = useIndexState()
    return (
        <div>
            <button onClick={() => {
                incerment()
            }}>+</button>
            <button onClick={() => {
                 decrement()
            }}>-</button>
            <h1>{count} items</h1>
        </div>
    );
}