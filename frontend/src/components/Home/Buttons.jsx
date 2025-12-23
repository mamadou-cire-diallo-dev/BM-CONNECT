import React from 'react'

export const PrimaryButton = ({ children, className, ...props }) => (
    <button className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium bg-linear-to-br from-[#0d2e55] to-[#0a2444]  hover:opacity-90 active:scale-95 transition-all ${className}`} {...props} >
        {children}
    </button>
);

export const PrimaryButtonOrange = ({ children, className, ...props }) => (
    <button className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium bg-linear-to-br from-[#f26f0e] to-[#ffbf47] text-[#0d2e55]  hover:opacity-90 active:scale-95 transition-all ${className}`} {...props} >
        {children}
    </button>
);

export const GhostButton = ({ children, className, ...props }) => (
    <button className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border-black/10 border dark:border-white/10 bg-black/3 dark:bg-white/3 hover:bg-white/6 backdrop-blur-sm active:scale-95 transition ${className}`} {...props} >
        {children}
    </button>
);

export const DisponibleButton = (props) => (
    <div className='flex gap-2'>
        <div className="relative flex h-3.5 w-3.5 items-center justify-center">
         <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300" />

        <span className="relative inline-flex size-2 rounded-full bg-green-600" />
       </div>

        {props.children}
    </div>
    
);