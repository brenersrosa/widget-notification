import moment from 'moment'

import { WidgetIcon } from './WidgetIcon'

import { notifications } from '@/utils/notifications'

console.log(notifications)

export function Widget() {
  function formatTimeAgo(date: Date): string {
    const currentDate = moment()
    const targetDate = moment(date)
    const diffMinutes = currentDate.diff(targetDate, 'minutes')

    if (diffMinutes < 60) {
      return `há ${diffMinutes} minutos`
    } else if (diffMinutes <= 60 * 60 * 24) {
      const diffDays = currentDate.diff(targetDate, 'days')
      return `há ${diffDays} dias`
    } else {
      const diffDays = currentDate.diff(targetDate, 'months')
      return `há ${diffDays} meses`
    }
  }

  return (
    <div className="w-[448px] overflow-hidden rounded">
      <div className="flex items-center justify-between bg-zinc-800 px-6 py-4">
        <span className="font-bold">Notificações</span>
        <button className="text-xs font-bold uppercase text-violet-500 transition-colors hover:text-violet-400">
          Marcar todas como vistas
        </button>
      </div>

      <div>
        <div className="bg-zinc-950 px-5 py-2 text-sm text-zinc-400">
          Recentes
        </div>
        {notifications.map(
          (notification) =>
            moment().diff(moment(notification.date), 'minutes') <= 15 && (
              <div key={notification.id} className="divide-y-2 divide-zinc-950">
                <div className="flex items-start gap-6 bg-zinc-900 px-8 py-4">
                  <WidgetIcon
                    type={notification.type}
                    asRead={notification.asRead}
                  />

                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-sm leading-relaxed text-zinc-100">
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-1 text-xxs text-zinc-400">
                      <span>{notification.type}</span>
                      <span> - {formatTimeAgo(notification.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ),
        )}
      </div>

      <div>
        <div className="bg-zinc-950 px-5 py-2 text-sm text-zinc-400">
          Antigas
        </div>

        {notifications.map(
          (notification) =>
            moment().diff(moment(notification.date), 'minutes') > 15 && (
              <div key={notification.id} className="divide-y-2 divide-zinc-950">
                <div className="flex items-start gap-6 bg-zinc-900 px-8 py-4">
                  <WidgetIcon
                    type={notification.type}
                    asRead={notification.asRead}
                  />

                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-1 text-xxs text-zinc-400">
                      <span>{notification.type}</span>
                      <span> - {formatTimeAgo(notification.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  )
}
