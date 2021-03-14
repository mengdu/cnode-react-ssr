import { useEffect, useState } from 'react'

export function useWatch (v, cb) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // 首次渲染不触发 watch
    if (mounted) cb(v)
  }, v)
}
