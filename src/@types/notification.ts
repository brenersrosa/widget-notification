export interface NotificationProps {
  id: string
  description: string
  type: 'new-content' | 'invite' | 'forum' | 'feed'
  date: Date
  asRead: boolean
}
