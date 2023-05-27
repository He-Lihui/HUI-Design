import { FC } from 'react'
import Menu from './menu'
import SubMenu from './subMenu'
import MenuItem from './menuItems'
import { MenuProps, SubMenuProps, MenuItemProps} from "./types/type"
export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>
}
const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu;