import React from 'react';

type CardVariant = 'base' | 'highlight' | 'premium';

interface CardProps
{
    variant?: CardVariant;
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

const variantStyles: Record<CardVariant, string> = {
    base: 'surface-panel surface-panel-interactive',
    highlight: 'surface-panel-elevated surface-panel-interactive',
    premium: 'surface-panel-premium surface-panel-interactive',
};

export default function Card ( { variant = 'base', children, className = '', as: Component = 'div' }: CardProps )
{
    return (
        <Component className={ `p-6 transition-all duration-300 ${ variantStyles[variant] } ${ className }` }>
            { children }
        </Component>
    );
}
