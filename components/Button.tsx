import React from 'react'

export default function Button({ label, classNames, onClick }: { label: string, classNames: string, onClick: () => any }) {
    return (
        <button className={classNames} onClick={onClick}>
            {label}
        </button>
    )
}
