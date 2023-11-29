import type { Meta, StoryObj } from '@storybook/react'
import ReduxStoreProviderDecorator, { todolistId1 } from '../../../stories/ReduxStoreProviderDecorator'
import { Todolist } from './Todolist'

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
    todolistId: todolistId1,
    todolistFilter: 'all',
    todolistTitle: 'What to learn',
  },
}

export const TodolistActiveTasks: Story = {
  args: {
    todolistId: todolistId1,
    todolistFilter: 'active',
    todolistTitle: 'What to learn',
  },
}

export const TodolistCompletedTasks: Story = {
  args: {
    todolistId: todolistId1,
    todolistFilter: 'completed',
    todolistTitle: 'What to learn',
  },
}
export default meta
