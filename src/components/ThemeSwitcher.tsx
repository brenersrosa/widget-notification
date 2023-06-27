'use client'

import * as SwitchRadix from '@radix-ui/react-switch'
import { Moon, Sun } from 'lucide-react'
import { useState } from 'react'

export function ThemeSwitcher() {
  const [theme, setTheme] = useState('light')

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.remove(theme)
    document.documentElement.classList.add(newTheme)
  }

  return (
    <div className="flex items-center gap-3">
      <SwitchRadix.Root
        className="flex h-6 w-11 items-center rounded-full bg-zinc-300 data-[state=checked]:bg-violet-500"
        id="status-mode"
        checked={theme === 'dark'}
        onCheckedChange={handleThemeToggle}
      >
        <SwitchRadix.Thumb className="flex h-[22px] w-[22px] translate-x-[1px] items-center justify-center rounded-full bg-zinc-50 transition-transform duration-100 data-[state=checked]:translate-x-full dark:bg-zinc-800">
          {theme === 'dark' ? (
            <Moon className="h-3 w-3 text-gray-100" />
          ) : (
            <Sun className="h-3 w-3 text-zinc-700" />
          )}
        </SwitchRadix.Thumb>
      </SwitchRadix.Root>
    </div>
  )
}
