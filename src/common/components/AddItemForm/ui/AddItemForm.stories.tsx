import type { Meta, StoryObj } from '@storybook/react'
import { AddItemForm } from 'common/components/index'

const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    addItem: {
      name: 'Add Item',
      description: 'Button clicked inside form',
      action: 'clicked',
    },
  },
}

type Story = StoryObj<typeof AddItemForm>

export const AddItemFormDefault: Story = {
  args: {
    placeholder: 'Название поля',
  },
  render: () => <AddItemForm addItem={() => {}} />,
}

export const AddItemFormError: Story = {
  args: {
    currentError: 'Заполните поле',
  },
  render: () => <AddItemForm addItem={() => {}} />,
}

export default meta
