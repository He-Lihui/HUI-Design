import React from "react";
import Form from "./form";
import Input from "../Input/input";
import Button from "../Button/button";
import FormItem from "./formItem";
import { Meta , StoryFn} from "@storybook/react";
import { CustomRule } from "./types/types";
import { action } from '@storybook/addon-actions'
import Select from "../Select/select";
import Option from "../Select/option";
const formMeta: Meta<typeof Form> = {
   title: "Form",
   component: Form,
   tags: ['autodocs'],
   decorators:[
    (Story) => (
        <div style={{ width : '600px'}}>
            <Story></Story>
        </div>
    )
   ]
}
export default formMeta


const confirmRules: CustomRule[] = [
    { type: 'string',required: true, min: 3, max: 8 },
    ({ getFieldValue }) => ({
      asyncValidator(rule, value) {
        console.log('the value', getFieldValue('password'))
        console.log(value)
        return new Promise((resolve, reject) => {
          if (value !== getFieldValue('password')) {
            reject('The two passwords that you entered do not match!')
          }
          setTimeout(() => {
            resolve()
          }, 1000)
        })
  
      }
    })
  ]
  export const ABasicForm: StoryFn = (args) => {
    return (
      <Form {...args} >
        <FormItem label='用户名' name='name' rules={[{type: 'string',required: true, min: 3}]}>
          <Input/>
        </FormItem>
        <FormItem label='密码' name='password' rules={[{type: 'string',required: true, min: 3, max: 8 }]}>
          <Input type="password"/>
        </FormItem>
        <div className='form-submit-area'>
          <Button type="submit" btntype='primary'>登陆</Button>
        </div>
      </Form>
    )
  }
  ABasicForm.storyName = '基本的登陆表单'

  export const BRegForm: StoryFn= (args) => { 
    const initialValues = {
      agreement: false
    }
    return (
      <Form {...args} initialValues={initialValues}>
        <FormItem label='邮件' name='email' rules={[{ type: 'email',required: true }]}>
          <Input/>
        </FormItem>
        <FormItem label='密码' name='password' rules={[{type: 'string',required: true, min: 3, max: 8 }]}>
          <Input type="password"/>
        </FormItem>
        <FormItem 
          label='性别' 
          name='gender'
          rules={[{type: 'string',required: true }]}
          getValueFromEvent={(e) => e }
          valuePropName='defaultValue'
        >
          <Select
            placeholder="请选择性别"
          >
            <Option value="男" />
            <Option value="女" />
          </Select>
        </FormItem>
        <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center'}}>
          <FormItem
            name='agreement' 
            rules={[{ type: 'enum', enum: [true], message: '请同意协议'}]}
            getValueFromEvent={(e) => e.target.checked }
            valuePropName='checked'
          >
            <input type="checkbox"/>
          </FormItem>
          <span className="agree-text">注册即代表你同意<a href='#'>用户协议</a></span>
        </div>
        <div className='form-submit-area'>
          <Button type="submit" btntype='primary'>登陆</Button>
        </div>
      </Form>
    )
  }
  BRegForm.storyName = '注册表单，支持多种 FormItem 组件' 