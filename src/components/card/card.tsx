import React from 'react';

interface CardProps {
    children: React.ReactNode;
    title?: string;
}

export const Card: React.FC<CardProps> = ({ children, title }) => {
    return (
        <div className="rounded-lg bg-white p-4 shadow-sm">
            {title && <h3 className="mb-3 text-lg font-bold text-gray-800">{title}</h3>}
            {children}
        </div>
    );
};