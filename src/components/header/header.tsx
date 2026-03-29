import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-slate-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                    <nav>
                        <ul className="flex gap-8">
                            <li><a href="#dashboard" className="hover:text-blue-400 transition">Dashboard</a></li>
                            <li><a href="#reports" className="hover:text-blue-400 transition">Reports</a></li>
                            <li><a href="#settings" className="hover:text-blue-400 transition">Settings</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;