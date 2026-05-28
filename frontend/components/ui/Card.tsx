import { clsx } from 'clsx'

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        'border border-borda bg-escuro/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-dourado hover:bg-[#141414] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]',
        className
      )}
    >
      {children}
    </div>
  )
}
