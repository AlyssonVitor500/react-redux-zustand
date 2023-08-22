import { ChevronDown, MessageCircle } from 'lucide-react'
import { Header } from '../components/Header'
import { Video } from '../components/Video'
import { Module } from '../components/Module'
import { useEffect } from 'react'
import { useCurrentLesson, useStore } from '../zustand-store'

/*

import { useAppDispatch, useAppSelector } from '../store'
import {
  loadCourse,
  useCurrentLesson,
  useLoadingState,
} from '../store/slices/player'

...
const modules = useAppSelector((state) => state.player.course?.modules)
const { currentLessons } = useCurrentLesson()
const dispatch = useAppDispatch()
const isCourseLoading = useLoadingState()

*/

export function Player() {
  const { course, load, isLoading } = useStore((store) => {
    return {
      course: store.course,
      load: store.load,
      isLoading: store.isLoading,
    }
  })

  const { currentLessons } = useCurrentLesson()

  useEffect(() => {
    if (currentLessons) {
      document.title = `Assistindo: ${currentLessons.title}`
    }
  }, [currentLessons])

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6 px-2">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixa feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>

          <aside className="w-80 border-l absolute top-0 right-0 bottom-0 divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-auto scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => {
                  return (
                    <div key={index}>
                      <button className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                        <div className="flex h-10 w-10 rounded-full animate-pulse bg-zinc-900"></div>

                        <div className="flex-1 animate-pulse">
                          <div className="flex flex-col gap-1 text-left">
                            <div className="h-4 w-36 bg-zinc-900 rounded"></div>
                            <div className="h-3 w-12 bg-zinc-900 rounded"></div>
                          </div>
                        </div>

                        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
                      </button>
                    </div>
                  )
                })
              : course?.modules &&
                course.modules.map((module, index) => {
                  return (
                    <Module
                      amountOfLessons={module.lessons.length}
                      moduleIndex={index}
                      title={module.title}
                      key={module.id}
                    />
                  )
                })}
          </aside>
        </main>
      </div>
    </div>
  )
}
