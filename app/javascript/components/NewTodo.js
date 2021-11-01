import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'//toastifyのcss

toast.configure();//toastifyを有効にするには必須（忘れがち）

export const NewTodo = (props) => {
  //propsを描き忘れないように注意してください。

  const notify = () => {
    toast.success("Todo successfully created!", {
      position: "bottom-center",
      hideProgressBar: true
    });
  }

  const initialTodoStatus = {
    id: null,
    content: "",
    is_completed: false
  }

  const [todo, setTodo] = useState(initialTodoStatus)

  const InputNewTodo = (e) => {
    const { name, value } = e.target;
    console.log(value) //入力した文字列
    console.log(name) //content 
    setTodo({ ...todo,[name]: value });
    //todoを展開して、カラム名を指定してvalueに更新します。
  }

  const onClickSaveTodo = () => {
    const newVal = {
      content: todo.content
      //contentカラムにinputで記述したものを代入しています。
    };
    axios.post('/api/v1/todoes', newVal)
    .then(resp => {
      setTodo({
        id: resp.data.id,
        content: resp.data.content,
        complete: resp.data.complete
      });
      //レスポンスで渡されたデータを代入していきます。
      notify();//toastifyの表示タイミング
      props.history.push("/todoes");
      //TodoList.jsにpropsとして情報を渡します。
    })
    .catch(e => {
      console.log(e)
    })
  }

  return (
    <>
      <h1>NewTodo</h1>
      <InputAndNew>
      <Input 
          type="text" 
          placeholder="NewTodo..." 
          required
          value={todo.name}
          onChange={InputNewTodo}
          name="content" />
        <NewBtn onClick={onClickSaveTodo}>AddNewTodo</NewBtn>
      </InputAndNew>
    </>
  )
}

const InputAndNew = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Input = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`

const NewBtn = styled.button`
  width: fit-content;
  height: 40px;
  background: #ccffcc;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`

