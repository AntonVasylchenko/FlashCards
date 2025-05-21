import React from 'react';
import type { ButtonType } from "../../types/index.ts"
import { getStyleButton } from '../consts/index.ts';

type ActionButtonType = {
    children: React.ReactNode,
    name: string,
    classList: ButtonType,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}


const ActionButton: React.FC<ActionButtonType> = ({ onClick, name, classList, children, ...rest }) => {
    return (
        <button
            className={getStyleButton(classList)}
            name={name}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    )
}

export default ActionButton;
