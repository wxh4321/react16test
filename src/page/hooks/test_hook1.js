/*
 * @Author: wxh4321
  * @Date: 2019-07-18 13:46:34
 * @Last Modified by: wxh4321
 * @Last Modified time: 2019-07-18 16:26:50
  */
 import React, { useState,useEffect,useReducer} from 'react';
import { Button,Form, Input, Table } from 'antd';
import axios from 'axios';

const container = {
    margin: '10px',
    padding: '6px',
};
const baseUrl = 'https://www.easy-mock.com/mock/5ce841273b839728ab376e72/api'; //mock数据的地址
const marginStyle = { margin: '6px 0px' };
const columns = [
  {
    title: '名字',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    align: 'center',
  },
  {
    title: '地址',
    dataIndex: 'address',
    align: 'center',
  },
];

function App(props) {
  const [data, setData] = useState([]);
  const [search,setSearch] = useState({name:''});
  const [loading ,setLoading] = useState(false);
//   useEffect(()=>{
//       const fetchData = async()=>{
//           const result = await axios(`${baseUrl}/getPersonList`);
//           setData(result.data.data.list);
//       };
//       fetchData();
//   },[]);//使用useEffect发送请求时,相当于在componentDidMount和componentDidUpdate中都发送了一次请求,
//   //要在useEffect函数中, 第二个参数为空数组, 就能实现只在组件安装时获取数据

  
  useEffect(()=>{
      const fetchData = async() => {
          setLoading(true);
          const result = await axios(`${baseUrl}/getPersonList?search=${search}`);
          debugger;
          if(result.data.code===0){
            setData(result.data.data.list);
            setLoading(false);
          }
          else{
            setLoading(false);
          }
      };
      fetchData();
  },[search]);

  const onSearch=() =>{
      const value = props.form.getFieldDecorator('name');
      setSearch({name:value});
  }
  const dataFetchReducer = (state,action)=>{
    switch(action.type){
        case 'FETCH_INIT':
            return {...state,loading:true};
        case 'FETCH_SUCCESS':
            return {...state,data:action.payload,loading:false};
        case 'FETCH_FAILING':
            return {...state,loading:false}
        default:
            throw new Error();
    }
  };
  const initialValue ={
      data:[],
      loading :false
  };
  const useFetchData = ()=>{
      const [search,setSearch] = useState({name:''});
      const [state,dispatch] = useReducer(dataFetchReducer,initialValue);
      const [data,setData] = useState([]);
      const [loading,setLoading] = useState(false);
      useEffect(()=>{
          const fetchData = async ()=>{
            setLoading(true);
            dispatch({type:'FETCH_INIT'});
            const result = await axios(`${baseUrl}\getPersonList?search=${search}`);
            if(result.data.data.code===0){
                setData(result.data.data.list);
                setLoading(false);
                dispatch({type:'FETCH_SUCCESS',payload:result.data.data.list});
            }
            else{
                setLoading(false);
                dispatch({type:'FETCH_FAILURE'});
            }
          };
          fetchData();
      },[search]);
      return [search,setSearch,state];
  }

  function Index(props){
    // const [{search,data,loading},setSearch] = useFetchData();
    
  }

  const { getFieldDecorator } = props.form;
  return (
      <div style={container}>
        <Form layout="inline">
          <Form.Item label="名字">
            {
              getFieldDecorator('name', {
                initialValue: search.name
              })(
                <Input value={search.name}/>
              )
            }
          </Form.Item>
          <Form.Item>
              <Button type="primary" onClick={onSearch}>查询</Button>
          </Form.Item>
        </Form>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          style={marginStyle}
          loading={loading}
        />
      </div>
   );
}

export default Form.create()(App);