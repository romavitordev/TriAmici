import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { clsx } from 'clsx'

type Props = {
  href?: string
  external?: boolean
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

export function Button({ href, external, children, variant = 'primary', className, type = 'button', disabled, onClick }: Props) {
  const classes = clsx('btn', variant === 'primary' ? 'btn-primary' : 'btn-outline', className)
  const content = (
    <span className="relative z-[1] flex items-center gap-[0.65rem]">
      {children}
      <ArrowUpRight size={16} aria-hidden />
    </span>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
