import React from 'react'

export default function LoginErrorMsg({ classname, title, subTitle, titleClassName, subTitleClassName }) {
    return (
        <div className={classname}>
            <div className={titleClassName}>{title}</div>
            <div className={subTitleClassName}>{subTitle}</div>
        </div>
    )
}
