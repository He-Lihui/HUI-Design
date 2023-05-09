import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { ChangeEvent, InputHTMLAttributes, ReactElement } from "react";

export type inputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>,'size'>{
    size?: inputSize;
    disabled?: boolean;
    icon?: IconProp;
    prefixes?: string | ReactElement;
    suffixes?: string | ReactElement;
    className?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface DataSourceObject{
    value: string;
}

export type DataSourceType <T = {}> = T & DataSourceObject 
export interface autoCompleteProps extends Omit<InputProps, 'onSelect'> {
    onSelect?: (item: DataSourceType) => void;
    fetchSuggestion: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    customRenderOptions?: (item: DataSourceType) => ReactElement;
}
  