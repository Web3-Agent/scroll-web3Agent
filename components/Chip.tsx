import React from 'react'

export default function Chip({ Icon, label, iconClassnames, classnames }: { Icon?: any, label?: string, iconClassnames?: string, classnames?: string }) {
    return (
        <div className={classnames}>
            {Icon && <Icon className={iconClassnames} />}
            {label}
        </div>
    )
}
