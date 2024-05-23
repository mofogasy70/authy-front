import React from "react";
export const CloseIcon = ({ size = 24, width, height, ...props }: any) => (
    <svg
        aria-hidden="true"
        fill="none"
        stroke="#000000"
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 64 64"
        width={size || width}
        {...props}
    >
        <line x1="16" y1="16" x2="48" y2="48"/><line x1="48" y1="16" x2="16" y2="48"/>
    </svg>
);
