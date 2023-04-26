
import { ReactNode } from "react"

export type ButtonSize = "lg" | "sm"

export type ButtonType = "primary" | "default" | "danger" | "link"

export interface BaseButtonProps {
    className?: string
    /**设置 Button 的类型 */
    btntype?: ButtonType,
    /**设置 Button 的尺寸 */
    size?: ButtonSize,
    /**Button 是否禁用 */
    disabled?: boolean,
    /**设置 Link 类按钮的链接地址 */
    href?: string,
    children: ReactNode
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

export type ButtonProps =  Partial<NativeButtonProps & AnchorButtonProps> 