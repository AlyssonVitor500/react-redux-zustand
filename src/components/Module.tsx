import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import { Lesson } from './Lesson'
import { useStore } from '../zustand-store'

/*

import { useAppDispatch, useAppSelector } from '../store'
import { play } from '../store/slices/player'

const dispatch = useAppDispatch()
const { currentLessonIndex, currentModuleIndex } = useAppSelector((state) => {
  const { currentLessonIndex, currentModuleIndex } = state.player

  return { currentLessonIndex, currentModuleIndex }
})

const lessons = useAppSelector((state) => {
  return state.player.course?.modules[moduleIndex].lessons
})

*/

interface ModuleProps {
  moduleIndex: number
  title: string
  amountOfLessons: number
}

export function Module({ amountOfLessons, title, moduleIndex }: ModuleProps) {
  const { currentLessonIndex, currentModuleIndex, play, lessons } = useStore(
    (store) => {
      return {
        lessons: store.course?.modules[moduleIndex].lessons,
        currentLessonIndex: store.currentLessonIndex,
        currentModuleIndex: store.currentModuleIndex,
        play: store.play,
      }
    },
  )

  const collapseIsOpen = currentModuleIndex === moduleIndex ? true : undefined

  return (
    <Collapsible.Root className="group" open={collapseIsOpen}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons &&
            lessons.map((lesson, lessonIndex) => {
              const isCurrent =
                currentModuleIndex === moduleIndex &&
                currentLessonIndex === lessonIndex

              return (
                <Lesson
                  title={lesson.title}
                  duration={lesson.duration}
                  key={lesson.id}
                  onPlay={() => play([moduleIndex, lessonIndex])}
                  isCurrent={isCurrent}
                />
              )
            })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
