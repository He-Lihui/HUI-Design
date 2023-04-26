import React from "react";
import Menu from "./menu";
import MenuItem from "./menuItems";
import SubMenu from "./subMenu";
import { Meta , StoryFn} from "@storybook/react";

const menuMeta: Meta<typeof Menu> = {
    title: "Menu",
    component: Menu,
    tags: ['autodocs'],
 }

export default menuMeta

const Template: StoryFn<typeof Menu> = (args) => (
    <Menu {...args}>
        <MenuItem>
            item1
        </MenuItem>
        <MenuItem disabled>
            item2
        </MenuItem>
        <MenuItem>
            item3
        </MenuItem>
        <SubMenu title="下拉菜单">
            <MenuItem>
                item1
            </MenuItem>
            <MenuItem disabled>
                item2
            </MenuItem>
            <MenuItem>
                item3
            </MenuItem>
        </SubMenu>
    </Menu>
)

export const DefaultMenu = Template.bind({})

DefaultMenu.storyName = "默认样式"

export const VarticalMenu = Template.bind({})

VarticalMenu.args = {
    defaultIndex : '0',
    mode: 'vartical'
}
VarticalMenu.storyName = "纵向菜单"