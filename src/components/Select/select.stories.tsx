import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Option from './option'
import Select from './select'
export default {
  title: 'Select',
  component: Select,
  id: 'Select',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Select>

export const ADefaultSelect: StoryFn<typeof Select> = (args) => (
  <Select
    {...args}
    placeholder="请选择"
  >
    <Option value="nihao" />
    <Option value="nihao2" />
    <Option value="nihao3" />
    <Option value="disabled" disabled/>
    <Option value="nihao5" />
  </Select>
)
ADefaultSelect.storyName = '默认的Select'
export const BMultipleSelect: StoryFn<typeof Select>= (args) => (
  <Select
    {...args}
    placeholder="支持多选"
    multiple
  >
    <Option value="nihao" />
    <Option value="nihao2" />
    <Option value="nihao3" />
    <Option value="viking" />
    <Option value="viking2" />
  </Select>
)
BMultipleSelect.storyName = '支持多选的 Select'
export const CDisabledSelect: StoryFn<typeof Select> = (args) => (
  <Select
    {...args}
    placeholder="禁用啦！"
    disabled
  >
    <Option value="nihao" />
    <Option value="nihao2" />
    <Option value="nihao3" />
  </Select>  
)
CDisabledSelect.storyName = '被禁用的 Select'
