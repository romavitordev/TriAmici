import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { clsx } from 'clsx'

type Props = {
  href?: string
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

export function Button({ href, children, variant = 'primary', className, type = 'button', disabled, onClick }: Props) {
  const classes = clsx('btn', variant === 'primary' ? 'btn-primary' : 'btn-outline', className)
  const content = (
    <>
      {children}
      <ArrowUpRight size={16} aria-hidden />
    </>
  )

  if (href) {
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
