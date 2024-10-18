import React from 'react'

export default function GlobalLoader() {
  return (
    <div className='w-full min-h-screen bg-slate-900 relative z-[10000]'>
        <div className='absolute h-40 w-40 bg-slate-900 border-8 border-dashed border-slate-100 border-t-slate-900 animate-spin origin-center rotate-180 scale-150 rounded-full left-[45%] top-[45%]'></div>
    </div>
  )
}
