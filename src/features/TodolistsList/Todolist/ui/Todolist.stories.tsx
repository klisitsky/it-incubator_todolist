import type { Meta, StoryObj } from '@storybook/react'
import ReduxStoreProviderDecorator, { initialState } from 'stories/ReduxStoreProviderDecorator'
import { Todolist } from 'features/TodolistsList/Todolist/ui/Todolist'

const meta: Meta<typeof Todolist> = {
  title: 'TODOLIST/Todolist',
  component: Todolist,
  parameters: {},
  decorators: [ReduxStoreProviderDecorator],
  tags: ['autodocs'],
}

type Story = StoryObj<typeof Todolist>

export const TodolistAllTasks: Story = {
  args: {
    todolist: initialState.todolists.todolists[0],
  },
}

export const TodolistActiveTasks: Story = {
  args: {
    todolist: initialState.todolists.todolists[1],
  },
}

export const TodolistCompletedTasks: Story = {
  args: {
    todolist: initialState.todolists.todolists[2],
  },
}
export default meta
