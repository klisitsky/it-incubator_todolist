import type { Meta, StoryObj } from '@storybook/react';
import {AddItemForm} from "./AddItemForm";

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
    }
  },
};


type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormDefault: Story = {
  args: {
    placeholder: 'Название поля'
  }
};

export const AddItemFormError: Story = {
  args: {
    error: 'Заполните поле'
  }
};

export default meta;