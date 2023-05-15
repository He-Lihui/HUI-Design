import React from "react";
import Form from "./form";
import Input from "../Input/input";
import Button from "../Button/button";
import FormItem from "./formItem";
import { Meta , StoryFn} from "@storybook/react";

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


export const DefaultForm: StoryFn<typeof Form> = (args) => {
    return(
        <Form {...args} initialValues={{ username: 'initial', password: 'initial'}}>
            <FormItem label="用户名" name="username" rules={[ { type : 'email', required: true}]}>
                <Input type="text"></Input>
            </FormItem>
            <FormItem label="密码" name="password" rules={[{ type: 'string', required: true, max: 8, min: 3 }]}>
                <Input type="password"></Input>
            </FormItem> 
            <FormItem name="check" valuePropName="checked" getValueFromEvent={(e) => (e.target.checked)}>
                <input type="checkbox"/>
            </FormItem>
            <div className="form-submit-area">
                <Button type="submit" btntype="primary">登录</Button>
            </div>
        </Form>
    )
}

DefaultForm.storyName = '默认的样式'