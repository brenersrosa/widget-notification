'use client'

import clsx from 'clsx'
import moment from 'moment'
import { useEffect, useState } from 'react'

import { ButtonActions } from './ButtonActions'
import { WidgetIcon } from './WidgetIcon'

import { NotificationProps } from '@/@types/notification'
import { api } from '@/lib/api'
import { CheckCheck } from 'lucide-react'

export function Widget() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<NotificationProps[]>([])

  useEffect(() => {
    api
      .get('/notifications')
      .then((response) => {
        setNotifications(response.data)
      })
      .catch((error) => {
        console.log('Error getting notifications.', error)
      })
  }, [])

  const handleMouseEnter = (notificationId: string) => {
    setHoveredItem(notificationId)
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
  }

  function formatTimeAgo(date: Date): string {
    const currentDate = moment()
    const targetDate = moment(date)
    const diffDuration = moment.duration(currentDate.diff(targetDate))

    const diffMonths = diffDuration.months()
    const diffDays = diffDuration.days()
    const diffHours = diffDuration.hours()
    const diffMinutes = diffDuration.minutes()

    if (diffMonths > 0) {
      return `há ${diffMonths} meses`
    } else if (diffDays > 0) {
      return `há ${diffDays} dias`
    } else if (diffHours > 0) {
      return `há ${diffHours} horas`
    } else {
      return `há ${diffMinutes} minutos`
    }
  }

  async function handleNotificationAsRead(notificationId: string) {
    const updatedNotification = notifications.map(async (notification) => {
      if (notification.id === notificationId) {
        const newStatus = notification.asRead !== true

        try {
          await api.put(`/notifications/${notification.id}`, {
            ...notification,
            asRead: newStatus,
          })
          console.log('Notification updated successfully.')
        } catch (error) {
          console.log('Error updating notification:', error)
          return notification
        }
        return {
          ...notification,
          asRead: newStatus,
        } as NotificationProps
      }
      return notification
    })

    const updatedNotificationsData = await Promise.all(updatedNotification)

    setNotifications(updatedNotificationsData)
  }

  async function markAllNotificationsAsRead(
    notifications: NotificationProps[],
  ): Promise<NotificationProps[]> {
    const updatedNotifications: NotificationProps[] = []

    for (const notification of notifications) {
      const newNotification: NotificationProps = {
        ...notification,
        asRead: true,
      }

      try {
        await api.put(`/notifications/${notification.id}`, newNotification)
        updatedNotifications.push(newNotification)
      } catch (error) {
        console.log(`Error updating notification ${notification.id}:`, error)
        updatedNotifications.push(notification)
      }
    }

    setNotifications(updatedNotifications)

    return updatedNotifications
  }

  return (
    <div className="w-[448px] overflow-hidden rounded">
      <div className="flex items-center justify-between bg-zinc-200 px-6 py-4 dark:bg-zinc-800">
        <span className="font-bold">Notificações</span>
        <button
          onClick={() => markAllNotificationsAsRead(notifications)}
          className="flex items-center gap-2 text-xs font-bold uppercase text-violet-500 transition-colors hover:text-violet-400"
        >
          Marcar todas como lidas <CheckCheck className="h-4 w-4" />
        </button>
      </div>

      <div>
        <div className="bg-zinc-300 px-5 py-2 text-sm font-medium text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
          Recentes
        </div>
        {notifications.map((notification) => {
          const isHovered = notification.id === hoveredItem
          const shouldRender =
            moment().diff(moment(notification.date), 'minutes') <= 15

          if (shouldRender) {
            return (
              <div
                key={notification.id}
                className="divide-y-2 divide-zinc-300 dark:divide-zinc-950"
              >
                <div
                  className="flex items-start gap-6 bg-zinc-200 px-8 py-4 dark:bg-zinc-900"
                  onMouseEnter={() => handleMouseEnter(notification.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <WidgetIcon
                    type={notification.type}
                    asRead={notification.asRead}
                  />

                  <div className="flex flex-1 flex-col gap-2">
                    <p
                      className={clsx(
                        'text-sm leading-relaxed text-zinc-500 dark:text-zinc-400',
                        {
                          'line-clamp-2': isHovered === true,
                        },
                      )}
                    >
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-1 text-xxs text-zinc-400">
                      <span>
                        {notification.type === 'new-content' && 'Novo conteúdo'}
                        {notification.type === 'invite' && 'Convite'}
                        {notification.type === 'forum' && 'Fórum'}
                        {notification.type === 'feed' && 'Feed'}
                      </span>
                      <span> - {formatTimeAgo(notification.date)}</span>
                    </div>
                  </div>

                  {isHovered && (
                    <div className="flex gap-2 self-center">
                      <ButtonActions variant="close" />
                      <ButtonActions
                        variant="check"
                        asRead={notification.asRead}
                        onClick={() =>
                          handleNotificationAsRead(notification.id)
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          }

          return null
        })}
      </div>

      <div>
        <div className="bg-zinc-300 px-5 py-2 text-sm font-medium text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
          Antigas
        </div>

        {notifications.map((notification) => {
          const isHovered = notification.id === hoveredItem
          const shouldRender =
            moment().diff(moment(notification.date), 'minutes') > 15

          if (shouldRender) {
            return (
              <div
                key={notification.id}
                className="divide-y-2 divide-zinc-300 dark:divide-zinc-950"
              >
                <div
                  className="flex items-start gap-6 bg-zinc-200 px-8 py-4 dark:bg-zinc-900"
                  onMouseEnter={() => handleMouseEnter(notification.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <WidgetIcon
                    type={notification.type}
                    asRead={notification.asRead}
                  />

                  <div className="flex flex-1 flex-col gap-2">
                    <p
                      className={clsx(
                        'text-sm leading-relaxed text-zinc-500 dark:text-zinc-400',
                        {
                          'line-clamp-2': isHovered === true,
                        },
                      )}
                    >
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-1 text-xxs text-zinc-400">
                      <span>
                        {notification.type === 'new-content' && 'Novo conteúdo'}
                        {notification.type === 'invite' && 'Convite'}
                        {notification.type === 'forum' && 'Fórum'}
                        {notification.type === 'feed' && 'Feed'}
                      </span>
                      <span> - {formatTimeAgo(notification.date)}</span>
                    </div>
                  </div>

                  {isHovered && (
                    <div className="flex gap-2 self-center">
                      <ButtonActions variant="close" />
                      <ButtonActions
                        variant="check"
                        asRead={notification.asRead}
                        onClick={() =>
                          handleNotificationAsRead(notification.id)
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
