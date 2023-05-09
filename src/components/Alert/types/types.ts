import  { ChangeEvent, ReactNode } from "react";

export interface BaseAlertProps {
    type?: AlertType;
    message: string;
    closable?: boolean;
    className?: string;
    showIcon?: boolean;
    description?: string
    onClose? : Function;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export type AlertType  = 'success' | 'default' | 'danger' | 'warning';
