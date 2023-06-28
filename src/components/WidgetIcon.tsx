import clsx from 'clsx'
import { Heart, Rocket, Ticket, Users2 } from 'lucide-react'

interface WidgetIconProps {
  type: 'new-content' | 'invite' | 'forum' | 'feed'
  asRead: boolean
}

export function WidgetIcon({ type, asRead = false }: WidgetIconProps) {
  return (
    <div className="relative">
      <div
        className={clsx('', {
          'absolute -right-2 top-2 h-2 w-2 rounded-full bg-red-500': !asRead,
        })}
      ></div>
      {type === 'new-content' && (
        <Rocket className="mt-4 h-6 w-6 text-violet-500" />
      )}
      {type === 'invite' && <Ticket className="mt-4 h-6 w-6 text-violet-500" />}
      {type === 'forum' && <Users2 className="mt-4 h-6 w-6 text-violet-500" />}
      {type === 'feed' && <Heart className="mt-4 h-6 w-6 text-violet-500" />}
    </div>
  )
}
