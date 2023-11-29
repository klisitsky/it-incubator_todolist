import type { Meta, StoryObj } from '@storybook/react'
import ButtonAppBar from './ButtonAppBar'

const meta: Meta<typeof ButtonAppBar> = {
  title: 'TODOLIST/ButtonAppBar',
  component: ButtonAppBar,
  parameters: {},
  tags: ['autodocs'],
}

type Story = StoryObj<typeof ButtonAppBar>

export const ButtonAppBarDefault: Story = {}

export default meta
