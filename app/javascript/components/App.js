import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import './App.css'
import { EditTodo } from './EditTodo'
import { NewTodo } from './NewTodo'
import { TodoList } from './TodoList'

export const App = () => {
  return (
    <>
      <Header>
        <Title>
          TODO
        </Title>
        <Actions>
          <Action>
            <Link to="/todoes">
              Todoes
            </Link>
          </Action>
          <Action>
            <Link to="/todoes/new">
              NewTodo
            </Link>
          </Action>
        </Actions>
      </Header>
      <Body>
        <Switch>
          <Route exact path="/todoes" component={TodoList} />
          <Route exact path="/todoes/new" component={NewTodo} />
          <Route path="/todoes/:id/edit" component={EditTodo} />
        </Switch>
      </Body>
    </>
  )
}

const Header = styled.div`
  background: #ccffcc;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 4px;
`

const Actions = styled.ul`
  display: flex;
  width: 400px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`

const Action = styled.li`
  font-size: 20px;
  font-weight: bold;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`

const Body = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`