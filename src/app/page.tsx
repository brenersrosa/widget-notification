import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { Widget } from '@/components/Widget'

export default function Home() {
  return (
    <main className="flex flex-col gap-6 h-screen items-center justify-center bg-zinc-50 dark:bg-gray-950 text-zinc-700 dark:text-zinc-50">
      <ThemeSwitcher />
      <Widget />
    </main>
  )
}
