import { FC } from 'react';
import { MenuProps, SubMenuProps, MenuItemProps } from "./types/type";
export type IMenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
