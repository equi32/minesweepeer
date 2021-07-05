import React from 'react';

const Layout = props => (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 w-4/5 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-4 bg-white shadow-lg rounded-3xl p-20">
                <div className="w-full">
                    { props.children }
                </div>
            </div>
        </div>
    </div>
);
 
export default Layout;