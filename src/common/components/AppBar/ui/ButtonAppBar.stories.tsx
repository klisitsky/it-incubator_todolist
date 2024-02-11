import type { Meta, StoryObj } from '@storybook/react'
import { ButtonAppBar } from 'common/components/index'
import ReduxStoreProviderDecorator from 'stories/ReduxStoreProviderDecorator'

const meta: Meta<typeof ButtonAppBar> = {
  title: 'TODOLIST/ButtonAppBar',
  component: ButtonAppBar,
  parameters: {},
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}

type Story = StoryObj<typeof ButtonAppBar>

export const ButtonAppBarDefault: Story = {
  render: () => <ButtonAppBar />,
}

export default meta
