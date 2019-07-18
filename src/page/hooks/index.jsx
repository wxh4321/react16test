import React, { useEffect, useState } from 'react'
//在非class中改变state

// 自定义hook


function useFriendStatus(friendID) {
  const [isOnline, setIsOnline1] = useState(null);
  useEffect(() => {
    console.log('hook组件 render')
    setIsOnline1(friendID);
    return () => {
      console.log('hook组件 卸载')
    };
  });

  return isOnline;
}
// 使用自定义hook
function FriendListItem() {
  const isOnline = useFriendStatus(true);
  const [ number, changeNumber ] = useState(0);
  const colors = ['red','green','red','blue'];
  const colorLen = colors.length;
  const [color,setColor] = useState('red');
  
  function ChangeColor(){
    const index = Math.floor(Math.random()*colorLen);
    setColor(colors[index]);
  }
  
  function add () {
    changeNumber(number + 1)
  }

  useEffect(() => {
    console.log('hooks componentDidMount')
  }, [0]);

  useEffect(() => {
    console.log('hooks render')
  });
  
  return (
    <div>
    <div>
    <input type="text" value={number} onChange={() => {console.log("number is "+number);}}/><button onClick={add}>点一点加1</button>
      <li style={{ color: isOnline ? 'green' : 'black' }}>
        'zhenganlin'
      </li>
    </div>
    <div 
    style={{
        width:"500px",
        textAlign:"center",
        padding:"20px 0px",
        backgroundColor:color,
        margin:"0 auto"
    }}>
      <h1 style={{color:"#eee"}}>test color change</h1>
      <br/>
      <button onClick={ChangeColor}>点我改背景色</button>
    </div>
    </div>
  );
}
export default FriendListItem