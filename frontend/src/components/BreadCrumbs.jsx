import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumbs = ({ productTitle }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <div className='bread-crumbs'>
            <p className='bread-crumbs-para'>
                <Link to='/'>Homepage</Link>
                {pathnames.length > 0 && ' > '}
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    let displayValue = decodeURIComponent(value);
                    if (value.match(/^[a-f0-9]{24}$/) && productTitle && isLast) {
                        displayValue = productTitle;
                    }

                    return isLast ? (
                        <span key={to}>{displayValue}</span>
                    ) : (
                        <React.Fragment key={to}>
                            <Link to={to}>{decodeURIComponent(value)}</Link> {' > '}
                        </React.Fragment>
                    );
                })}
            </p>
        </div>
    );
};

export default BreadCrumbs;
