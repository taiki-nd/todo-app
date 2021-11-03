import styled from 'styled-components'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css"//toastifyのcss

toast.configure();//忘れがちです

export const EditTodo = (props) => {

  const notify = () => {
    toast.success("Todo successfully updated!", {
      //NewTodo.jsをコピペするとメッセージがおかしいので修正しください。
      position: "bottom-center",
      hideProgressBar: true
    });
  }

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

  const onChangeEditTodo = event => {
    const { name, value } = event.target;
    console.log(name)//content 
    console.log(value)//編集した文字列
    setCurrentTodo({ ...currentTodo, [name]: value });
    //todoを展開して、カラム名を指定してvalueに更新します。
  };

  const onClickUpdateTodo = () => {
    axios.patch(`/api/v1/todoes/${currentTodo.id}`, currentTodo)
    .then(resp => {
      notify();//ここでtoastを呼び出す
      props.history.push("/todoes");
    })
    .catch(e => {
      console.log(e);
    });
  };

  const onClickCompleteBtn = (val) => {
    var updateVal = {
      id: val.id,
      name: val.name,
      complete: !val.complete
      //completeカラムをひっくり返します（boolean型なのでtrueならfalseに、falseならtrueに）
    };
    axios.patch(`/api/v1/todoes/${val.id}`, updateVal)
    .then(resp => {
      setCurrentTodo(resp.data);
    })
  };

  const onClickDeleteBtn = () => {
    const alert = window.confirm('Do you really want to delete this TodoList?')
    if (alert) {
      axios.delete(`/api/v1/todoes/${currentTodo.id}`)
      .then(resp => {
        console.log(resp.data)
        props.history.push("/todoes");
      })
      .catch(e => {
        console.log(e)
      })
    }
  }

  return (
    <>
      <h1>EditTodo</h1>
      <h2>CurrentTodo</h2>
      <EditInputAndBtn>
        <EditInput 
          type="text"
          value={currentTodo.content}
          name="content"
          onChange={onChangeEditTodo} />
        <UpdateBtn onClick={onClickUpdateTodo} >update</UpdateBtn>
      </EditInputAndBtn>
      <h2>CurrentStatus</h2>
      <Status>
        {currentTodo.complete ? "Complete" : "Incomplete" }
      </Status>
      <h2>EditStatus</h2>
      <Btns>
        {currentTodo.complete ? (
          <IncompleteBtn onClick={() => onClickCompleteBtn(currentTodo)}>incomplete</IncompleteBtn>
        ) : (
          <CompleteBtn onClick={() => onClickCompleteBtn(currentTodo)}>complete</CompleteBtn>
        )}
        <DeleteBtn onClick={onClickDeleteBtn}>delete</DeleteBtn>
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