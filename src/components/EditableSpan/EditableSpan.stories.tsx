import type { Meta, StoryObj } from '@storybook/react';
import {EditableSpan} from "./EditableSpan";
import React from "react";

const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    callback: {
      name: 'set text',
      action: 'setting a value',
    }
  },
};

type Story = StoryObj<typeof EditableSpan>;


export const EditableSpanDefault: Story = {
  args: {
    oldTitle: 'asdasd',
    edit: false
  }
};


export const EditableSpanEdit: Story = {
  args: {
    oldTitle: 'asdasd',
    edit: true
  }
};

export default meta;