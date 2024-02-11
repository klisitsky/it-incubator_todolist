import type { Meta, StoryObj } from '@storybook/react'
import { App } from 'features/index'
import ReduxStoreProviderDecorator from 'stories/ReduxStoreProviderDecorator'

const meta: Meta<typeof App> = {
  title: 'TODOLIST/App',
  component: App,
  parameters: {},
  decorators: [ReduxStoreProviderDecorator],
  tags: ['autodocs'],
}

type Story = StoryObj<typeof App>

export const AppDefault: Story = {
  render: () => <App />,
}

export default meta
