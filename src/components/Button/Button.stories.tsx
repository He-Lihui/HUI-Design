 import React from "react";
 import Button from "./button";
 import { Meta , StoryFn} from "@storybook/react";
//  import mdx from "./button.mdx";
 const buttonMeta: Meta<typeof Button> = {
    title: "Button",
    component: Button,
    tags: ['autodocs'],
 }

 export default buttonMeta

 export const Default: StoryFn<typeof Button> = (args) => 
    ( <Button {...args}>Default Button</Button>)
 
 Default.storyName = "默认按钮";
 
 export const ButtonSize: StoryFn<typeof Button> = () => (
        <>
            <Button size="lg">Large Button</Button>
            <Button size="sm">Small Button</Button>
        </>
    )
 
 ButtonSize.storyName = "不同尺寸的按钮"
 
 export const ButtonType: StoryFn<typeof Button> = () => 
    (
        <>
            <Button btntype="danger">Danger Button</Button>
            <Button btntype="link">Link Button</Button>
            <Button btntype="primary">Primary Button</Button>
        </>
    )
 ButtonType.storyName = "不同类型的按钮";

 ButtonType.decorators = [
     (Story) => (
        <div style={{padding : '20px'}}><Story></Story></div>
     )
 ]
 