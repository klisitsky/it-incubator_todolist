import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Todolist } from 'features/TodolistsList/Todolist/ui/Todolist'
import Container from '@mui/material/Container'
import { AppRootStateType } from 'features/App/store'
import { TodolistDomainType, todolistsThunks } from 'features/TodolistsList/Todolist/model/todolistsSlice'
import { todolistsSelector } from 'common/selectors/selectors'
import { Navigate } from 'react-router-dom'
import { AddItemForm } from 'common/components'
import { useSelector } from 'react-redux'
import { useAppSelector } from 'common/hooks'
import { useActions } from 'common/hooks/useActions'

export const TodolistsList = () => {
  const { fetchTodolists, createTodolist } = useActions(todolistsThunks)
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(todolistsSelector)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) return
    fetchTodolists()
  }, [])

  const addTodolistCallback = (newTitle: string) => {
    return createTodolist(newTitle).unwrap()
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Container maxWidth={'xl'}>
        <div className='App'>
          <Grid
            container
            style={{ margin: '20px' }}>
            <AddItemForm
              addItem={addTodolistCallback}
              placeholder={'Новый список задач'}
            />
          </Grid>
          <Grid
            container
            spacing={6}>
            {todolists.map((todo) => {
              return (
                <Todolist
                  key={todo.id}
                  todolist={todo}
                />
              )
            })}
          </Grid>
        </div>
      </Container>
    </>
  )
}
