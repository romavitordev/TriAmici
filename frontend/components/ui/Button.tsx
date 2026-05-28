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
}

export function Button({ href, children, variant = 'primary', className, type = 'button', disabled }: Props) {
  const classes = clsx('btn', variant === 'primary' ? 'btn-primary' : 'btn-outline', className)
  const content = (
    <>
      {children}
      <ArrowUpRight size={16} aria-hidden />
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} disabled={disabled} className={classes}>
      {content}
    </button>
  )
}
