import { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  mountPointId?: string
  className?: string
  children?: ReactNode
}

export const Portal = ({ mountPointId = 'modal-root', children, className }: PortalProps) => {
  const mountPointRef = useRef<HTMLDivElement>(null)
  const [portal, setPortal] = useState<HTMLDivElement>(null as unknown as HTMLDivElement)

  useEffect(() => {
    const existingMountPoint = document.getElementById(mountPointId)

    if (!existingMountPoint) {
      const mountPoint = document.createElement('div')
      mountPoint.id = mountPointId
      document.body.appendChild(mountPoint)
      ;(mountPointRef as MutableRefObject<HTMLDivElement>).current = mountPoint
    } else {
      ;(mountPointRef as MutableRefObject<HTMLDivElement>).current = existingMountPoint as HTMLDivElement
    }

    const portalNode = document.createElement('div')
    portalNode.classList.add('portal')
    className
      ?.trim()
      .split(' ')
      .filter(e => e)
      .forEach((e: string) => {
        portalNode.classList.add(e)
      })
    ;(mountPointRef as MutableRefObject<HTMLDivElement>).current.appendChild(portalNode)
    setPortal(portalNode)

    return () => {
      ;(mountPointRef as MutableRefObject<HTMLDivElement>).current.removeChild(portalNode)
      setPortal(null as unknown as HTMLDivElement)
    }
  }, [mountPointId, className])

  if (!portal) return null
  return createPortal(children, portal)
}

export default Portal
