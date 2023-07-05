import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { Widget } from '@/components/Widget'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6 bg-zinc-50 text-zinc-700 dark:bg-gray-950 dark:text-zinc-50">
      <ThemeSwitcher />
      <Widget />
    </main>
  )
}
