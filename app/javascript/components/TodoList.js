import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export const TodoList = () => {

  const [todoes, setTodoes] = useState([])
  //todoesにデータベース内全てのtodoが格納される

  useEffect(() => {
    axios.get('/api/v1/todoes.json')
    //todoes_controller.rbにアクセスされます。そしてtodoesがjson形式で返されるのでreact側で受け取る。
    .then(resp => {
      console.log(resp.data)
      //コンソールで何が返ってくるか確認できます。
      setTodoes(resp.data)
      //これでtodoesに全てのtodoが格納されます。
    })
  }, [])
  //第二引数にからの配列を渡すことでTodoList.jsが描画された際に一度だけuseEffectが走る。

  return (
    <>
      <h1>Todoes</h1>
      <InputAndRemoveAll>
        <Input />
        <RemoveAllBtn>RemoveAll</RemoveAllBtn>
      </InputAndRemoveAll>
      <div>
        {todoes.map((val, key) => {
          //格納された全てのtodoをmapで展開していきます。
          return(
            <div key={key}>
              <span>{val.content}</span>
              <button>complete</button>
              <button>edit</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

const InputAndRemoveAll = styled.div`
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

const RemoveAllBtn = styled.button`
  width: fit-content;
  height: 40px;
  background: #cc3366;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
`