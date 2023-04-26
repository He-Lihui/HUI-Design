import { Meta , StoryFn} from "@storybook/react";
import Tabs from "./tab";
import TabItem from "./tabItem";

const TabMeta: Meta<typeof Tabs> = {
    title: "Tab",
    component: Tabs,
    tags: ['autodocs'],
}

export default TabMeta;

const Template: StoryFn<typeof Tabs> = (args) => (
    <Tabs {...args}>
        <TabItem label={"title 1"}> context 1</TabItem>
        <TabItem label={"title 2"} disabled> context 2</TabItem>
        <TabItem label={"title 3"}> context 3</TabItem>
    </Tabs>
)

export const DefaultTab = Template.bind({})

DefaultTab.storyName = "默认样式"

export const lineTab = Template.bind({})

lineTab.args = {
    type :'line'
}

lineTab.storyName = "线性样式"
