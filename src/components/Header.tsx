import { useCurrentLesson, useStore } from '../zustand-store'

/*

import { useCurrentLesson, useLoadingState } from '../store/slices/player'
const { currentLessons, currentModule } = useCurrentLesson()

*/

export function Header() {
  const { currentLessons, currentModule } = useCurrentLesson()
  const isLoading = useStore((store) => store.isLoading)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1 animate-pulse">
        <div className="h-8 w-72 bg-zinc-900 rounded"></div>
        <div className="h-5 w-60 bg-zinc-900 rounded"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLessons?.title}</h1>
      <span className="text-sm text-zinc-400">
        Módulo &quot;{currentModule?.title}&quot;
      </span>
    </div>
  )
}
