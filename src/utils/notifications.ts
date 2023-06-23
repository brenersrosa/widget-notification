// import Chance from 'chance'
import { randomUUID } from 'crypto'

interface NotificationProps {
  id: string
  description: string
  type: 'new-content' | 'invite' | 'forum' | 'feed'
  date: Date
  asRead: boolean
}

function subtractMinutesFromCurrentDate(minutes: number): Date {
  const currentDate = new Date()
  currentDate.setMinutes(currentDate.getMinutes() - minutes)
  return currentDate
}

export const notifications: NotificationProps[] = [
  {
    id: randomUUID().toString(),
    description:
      'Um novo vídeo de Mayk Brito foi publicado no ExpertsClub! Vem conferir!',
    type: 'new-content',
    date: subtractMinutesFromCurrentDate(5),
    asRead: false,
  },
  {
    id: randomUUID().toString(),
    description:
      'Você recebeu um convite para fazer parte da empresa Rocketseat.',
    type: 'invite',
    date: subtractMinutesFromCurrentDate(10),
    asRead: false,
  },
  {
    id: randomUUID().toString(),
    description:
      'Você foi mencionado no tópico "NextJS é o novo PHP?", por Diego Fernandes.',
    type: 'forum',
    date: subtractMinutesFromCurrentDate(15),
    asRead: true,
  },
  {
    id: randomUUID().toString(),
    description: 'Flávia Oliveira e mais 5 pessoas gostaram do seu comentário.',
    type: 'feed',
    date: subtractMinutesFromCurrentDate(131400),
    asRead: true,
  },
  {
    id: randomUUID().toString(),
    description: 'Novas aulas disponíveis no Ignite React JS.',
    type: 'new-content',
    date: subtractMinutesFromCurrentDate(10230),
    asRead: true,
  },
]
