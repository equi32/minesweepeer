import React from 'react';
import PropTypes from 'prop-types';

const Layout = props => (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="py-3 w-4/5 mx-auto flex content-center justify-center">
            <div className={`px-4 py-4 bg-white shadow-lg rounded-3xl p-20 ${ props.halfWidth ? 'w-1/2' : '' }`}>
                <div className="w-full">
                    { props.children }
                </div>
            </div>
        </div>
    </div>
);

Layout.propTypes = {
    children: PropTypes.node,
}
 
export default Layout;