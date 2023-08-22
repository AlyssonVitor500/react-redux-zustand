import ReactPlayer from 'react-player'
import { Loader2 } from 'lucide-react'
import { useCurrentLesson, useStore } from '../zustand-store'

/*

import { next, useCurrentLesson, useLoadingState } from '../store/slices/player'
import { useAppDispatch } from '../store'

const dispatch = useAppDispatch()

const { currentLessons } = useCurrentLesson()
const isCourseLoading = useLoadingState()

function handlePlayNext() {
  dispatch(next())
}

*/

export function Video() {
  const { currentLessons } = useCurrentLesson()
  const { isLoading, next } = useStore((store) => {
    return {
      isLoading: store.isLoading,
      next: store.next,
    }
  })

  function handlePlayNext() {
    next()
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader2 className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          playing
          url={`https://www.youtube.com/watch?v=${currentLessons?.id}`}
          onEnded={handlePlayNext}
        />
      )}
    </div>
  )
}
