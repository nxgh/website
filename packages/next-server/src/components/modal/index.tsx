import { PropsWithChildren, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

function useOnKeyDown(key: string, callback: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) {
        callback()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}

export default function Modal(
  props: PropsWithChildren<{
    visible: boolean
    onCancel?: () => void
    className?: string
    contentClassName?: string
  }>
) {
  const { visible, onCancel, className, contentClassName } = props

  useOnKeyDown('Escape', () => {
    onCancel && onCancel()
  })

  if (!visible) {
    return null
  }
  return (
    <>
      {createPortal(
        <div
          className={`modal fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-gray-400 bg-opacity-50 z-index-10 ${className}`}
          onClick={() => {
            onCancel && onCancel()
          }}
        >
          <div
            className={`modal-content min-w-[50vw] min-h-[30vh] bg-white rounded-xl ${contentClassName}`}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {props.children}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
