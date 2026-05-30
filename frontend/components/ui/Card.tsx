import { clsx } from 'clsx'

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        'group relative overflow-hidden border border-borda bg-escuro/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-dourado hover:bg-[#141414] hover:shadow-[0_16px_44px_rgba(201,168,76,0.16)]',
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-dourado via-douradoSuave to-dourado transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100"
      />
      {children}
    </div>
  )
}
