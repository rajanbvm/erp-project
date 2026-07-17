import React from 'react'
import Link from 'next/link'

const AdminPageTitle = ({ title, buttonText, buttonLink }) => {
    return (
        <div className="page-header">
            <h2>{title}</h2>
            {buttonText && buttonLink && (
                <Link href={buttonLink} className="btn-primary">
                    {buttonText}
                </Link>
            )}
        </div>
    )
}

export default AdminPageTitle