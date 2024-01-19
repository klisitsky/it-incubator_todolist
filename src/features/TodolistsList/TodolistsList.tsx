import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Todolist } from 'features/TodolistsList/Todolist/Todolist'
import Container from '@mui/material/Container'
import { AppRootStateType } from 'features/App/store'
import { createTodolistTC, getTodolistsTC, TodolistDomainType } from 'features/TodolistsList/Todolist/todolistsReducer'
import { todolistsSelector } from 'common/selectors/selectors'
import { Navigate } from 'react-router-dom'
import { AddItemForm } from 'common/components'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { useSelector } from 'react-redux'

export const TodolistsList = () => {
  const dispatch = useAppDispatch()
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(todolistsSelector)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(getTodolistsTC())
  }, [dispatch])

  const addTodolist = (newTitle: string) => {
    dispatch(createTodolistTC(newTitle))
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
              addItem={addTodolist}
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
                  todolistId={todo.id}
                  todolistTitle={todo.title}
                  todolistFilter={todo.filter}
                  todolistLoadingStatus={todo.loadingStatus}
                />
              )
            })}
          </Grid>
        </div>
      </Container>
    </>
  )
}
