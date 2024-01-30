'use client'

import clsx from 'clsx'

export type TagProps = {
  text: string;
  className?: string;
  onClick?: () => void;
  size?: 'default' | 'lg';
};

export default function Tag({
  text,
  className,
  onClick,
  size = 'default',
}: TagProps) {
  return (
    <span
      className={clsx(
        'text-text-weak bg-card-background  rounded-4px hover:text-secondary cursor-pointer hover:underline',
        className,
        { 'text-sm px-3 py-2': size === 'lg' },
        { 'text-xs px-2 py-1': size === 'default' }
      )}
      onClick={(e) => {
        if (!onClick) {
          return
        }
        e.stopPropagation()

        onClick?.()
      }}
    >
      # {text}
    </span>
  )
}
