import { Meta , StoryFn} from "@storybook/react";
import { Input } from "./input";
import React, { useState } from "react";
import AutoComplete from "./autoComplete";
import { action } from '@storybook/addon-actions'
import { DataSourceType } from "./types/types";
const InputMeta: Meta<typeof Input> = {
    title:'Input',
    id:'Input',
    component: Input,
    tags: ['autodocs'],
    decorators:[
        (Story) => (
            <div style={{ width: '350px' }}>
            <Story/>
            </div>
        )
    ]
}

export default InputMeta;


const Template: StoryFn<typeof Input> = (args) => <Input {...args} /> 


export const ADefault = Template.bind({})
ADefault.args = {
  placeholder: 'placeholder message'
}
ADefault.storyName = '默认的 Input'
export const BDisabled = Template.bind({})
BDisabled.args = {
  placeholder: 'disabled input',
  disabled: true
}
BDisabled.storyName = '被禁用的 Input'

export const CIcon = Template.bind({})
CIcon.args = {
  placeholder: 'input with icon',
  icon: 'search'
}
CIcon.storyName = '带图标的 Input'

export const DSizeInput = () => (
  <>
    <Input
      defaultValue="large size"
      size="lg"
    />
    <Input
      placeholder="small size"
      size="sm"
    />
  </>
)
DSizeInput.storyName = '大小不同的 Input'
export const EPandInput = () => (
  <>
    <Input
      defaultValue="prepend text"
      prefixes="https://"
    />
    <Input
      defaultValue="google"
      suffixes=".com"
    />
  </>
)

EPandInput.storyName = '带前后缀的 Input'
interface ArrayProps {
  value: string;
  number?: number;
}
export const AutoCompleteInput = () => {

  const arr = [
    {value: 'java', number: 1233},
    {value: 'javascript', number: 544},
    {value: 'python', number: 8798},
    {value: 'go', number: 865},
    {value: 'c++', number: 346},
    {value: 'C#', number: 153},
  ]
  const handleFetch = (query : string) => {
    return arr.filter(itme => itme.value.includes(query))
  }
  const renderList = (item: DataSourceType<ArrayProps>) => {
    return (
      <>
         <p>自定义渲染: {item.value}</p>
         <p>number: {item.number}</p>
      </>
   
    )
  }
  return(
    <> 
    <AutoComplete
      fetchSuggestion={handleFetch}
      onSelect={action('selected')}
      // customRenderOptions={renderList}
    />
    </>
  )
}

export const customRender = () => {

  const arr = [
    {value: 'java', number: 1233},
    {value: 'javascript', number: 544},
    {value: 'python', number: 8798},
    {value: 'go', number: 865},
    {value: 'c++', number: 346},
    {value: 'C#', number: 153},
  ]
  const handleFetch = (query : string) => {
    return arr.filter(itme => itme.value.includes(query))
  }
  const renderList = (item: DataSourceType<ArrayProps>) => {
    return (
      <>
         <p>自定义渲染: {item.value}</p>
         <p>number: {item.number}</p>
      </>
   
    )
  }
  return(
    <> 
    <AutoComplete
      fetchSuggestion={handleFetch}
      onSelect={action('selected')}
      customRenderOptions={renderList}
    />
    </>
  )
}
customRender.storyName = '支持自定义渲染列表'

export const AsyncAutoCompleteInput = () => {

  const handleFetch = (query : string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then( res => res.json())
      .then( ({ items }) => {
          const formatItems = items.slice(0,10).map( (item: { login: string; }) => ( { value: item.login, ...item})) 
          return formatItems
      })
  }
  const renderList = (item: DataSourceType<ArrayProps>) => {
    return (
      <>
         <p>自定义渲染: {item.value}</p>
         <p>number: {item.number}</p>
      </>
   
    )
  }
  return(
    <> 
    <AutoComplete
      fetchSuggestion={handleFetch}
      onSelect={action('selected')}
      // customRenderOptions={renderList}
    />
    </>
  )
}

AsyncAutoCompleteInput.storyName = "支持异步获取数据"