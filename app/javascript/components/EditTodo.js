import styled from 'styled-components'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const EditTodo = (props) => {

  const initialTodoStatus = {
    id: null,
    content: "",
    complete: false
  };

  const [currentTodo, setCurrentTodo] = useState(initialTodoStatus)

  const getTodo = id => {
    axios.get(`/api/v1/todoes/${id}`)
    //idからレスポンスされるデータを受け取り、setCurrentTodoへ
    .then(resp => {
      setCurrentTodo(resp.data);
    })
    .catch(e => {
      console.log(e);
    })
  }

  useEffect(() => {
    getTodo(props.match.params.id)
    //URLからidを取得
    console.log(props.match.params.id)//これで確認できます
  }, [props.match.params.id]);//idの変更でuseEffectが走るようにします。（editページが開いたら実行される）

  return (
    <>
      <h1>EditTodo</h1>
      <h2>CurrentTodo</h2>
      <EditInputAndBtn>
        <EditInput 
          type="text"
          value={currentTodo.content}
          content="content" 
          onChange={} />
        <UpdateBtn>update</UpdateBtn>
      </EditInputAndBtn>
      <h2>CurrentStatus</h2>
      <Status>
        Complete Incomplete
      </Status>
      <h2>EditStatus</h2>
      <Btns>
        <CompleteBtn>complete</CompleteBtn>
        <IncompleteBtn>incomplete</IncompleteBtn>
        <DeleteBtn>delete</DeleteBtn>
      </Btns>
    </>
  )
}

const EditInputAndBtn = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`

const EditInput = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`

const UpdateBtn = styled.button`
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

const Status = styled.p`
  font-size: 18px;
  text-align: center;
`

const Btns = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`

const CompleteBtn = styled.button`
  width: fit-content;
  font-size: 20px;
  padding: 0 5px;
  margin: 0 5px;
  &:hover{
    background-color: #ccffcc;
  }
`

const IncompleteBtn = styled.button`
  width: fit-content;
  font-size: 20px;
  padding: 0 5px;
  margin: 0 5px;
  &:hover{
    background-color: #ccffcc;
  }
`

const DeleteBtn = styled.button`
  width: fit-content;
  font-size: 20px;
  padding: 0 5px;
  margin: 0 5px;
  &:hover{
    background-color: #cc3366;
  }
`