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
    base: 'bg-[#060608] border border-white/5 hover:border-[#00e5ff]/20 hover:bg-[rgba(0,229,255,0.04)]',
    highlight: 'bg-[#0c0c10] border border-[#00e5ff]/10 hover:border-[#00e5ff]/40 hover:shadow-[0_0_30px_rgba(0,229,255,0.08)]',
    premium: 'bg-[#0c0c10] border border-[#00e5ff]/30 hover:border-[#00e5ff]/60 hover:shadow-[0_0_60px_rgba(0,229,255,0.12)] relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#00e5ff]/5 before:to-transparent before:pointer-events-none',
};

export default function Card ( { variant = 'base', children, className = '', as: Component = 'div' }: CardProps )
{
    return (
        <Component className={ `p-6 transition-all duration-300 ${ variantStyles[variant] } ${ className }` }>
            { children }
        </Component>
    );
}
