import { NotificationProps } from '@/@types/notification'

function subtractMinutesFromCurrentDate(minutes: number): Date {
  const currentDate = new Date()
  currentDate.setMinutes(currentDate.getMinutes() - minutes)
  return currentDate
}

export const notifications: NotificationProps[] = [
  {
    id: '59d73668-1422-11ee-be56-0242ac120002',
    description:
      'Um novo vídeo de Mayk Brito foi publicado no ExpertsClub! Vem conferir!',
    type: 'new-content',
    date: subtractMinutesFromCurrentDate(5),
    asRead: false,
  },
  {
    id: '60fddf46-1422-11ee-be56-0242ac120002',
    description:
      'Você recebeu um convite para fazer parte da empresa Rocketseat.',
    type: 'invite',
    date: subtractMinutesFromCurrentDate(10),
    asRead: false,
  },
  {
    id: '67266e38-1422-11ee-be56-0242ac120002',
    description:
      'Você foi mencionado no tópico "NextJS é o novo PHP?", por Diego Fernandes.',
    type: 'forum',
    date: subtractMinutesFromCurrentDate(15),
    asRead: true,
  },
  {
    id: '6f804ae0-1422-11ee-be56-0242ac120002',
    description: 'Flávia Oliveira e mais 5 pessoas gostaram do seu comentário.',
    type: 'feed',
    date: subtractMinutesFromCurrentDate(131400),
    asRead: true,
  },
  {
    id: '732819fc-1422-11ee-be56-0242ac120002',
    description: 'Novas aulas disponíveis no Ignite React JS. Venha conferir!',
    type: 'new-content',
    date: subtractMinutesFromCurrentDate(10230),
    asRead: true,
  },
]
