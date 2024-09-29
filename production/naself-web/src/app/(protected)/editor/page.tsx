'use client'

import { Suspense, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { File, Folder, Tree, TreeViewElement } from '@/components/ui/file-tree'

const MonacoEditor = dynamic(() => import('react-monaco-editor'), { ssr: false })

const ELEMENTS = [
  {
    id: '1',
    isSelectable: true,
    name: 'src',
    children: [
      {
        id: '2',
        isSelectable: true,
        name: 'app',
        children: [
          {
            id: '3',
            isSelectable: true,
            name: 'layout.tsx'
          },
          {
            id: '4',
            isSelectable: true,
            name: 'page.tsx'
          }
        ]
      },
      {
        id: '5',
        isSelectable: true,
        name: 'components',
        children: [
          {
            id: '6',
            isSelectable: true,
            name: 'header.tsx'
          },
          {
            id: '7',
            isSelectable: true,
            name: 'footer.tsx'
          }
        ]
      },
      {
        id: '8',
        isSelectable: true,
        name: 'lib',
        children: [
          {
            id: '9',
            isSelectable: true,
            name: 'utils.ts'
          }
        ]
      }
    ]
  }
]

export default function EditorPage() {
  const [selected, setSelected] = useState<string | null>(null)

  const renderFolderStructure = (elements: TreeViewElement[]) => {
    return elements.map(element => {
      if (element.children) {
        return (
          <Folder
            key={element.id}
            element={element.name}
            value={element.id}
          >
            {renderFolderStructure(element.children)}
          </Folder>
        )
      }

      return (
        <File
          key={element.id}
          value={element.id}
          handleSelect={setSelected}
        >
          <p>{element.name}</p>
        </File>
      )
    })
  }

  const selectedItem = useMemo(() => {
    const getElementWithParents = (elements: TreeViewElement[], id: string): string => {
      for (const element of elements) {
        if (element.id === id) {
          return element.name
        }

        if (element.children) {
          const result = getElementWithParents(element.children, id)
          if (result) {
            return `${element.name}/${result}`
          }
        }
      }

      return ''
    }

    return selected ? getElementWithParents(ELEMENTS, selected) : ''
  }, [selected])

  return (
    <main className='row-layout h-full'>
      <div className='fixed left-0 top-16 w-72 h-full bg-layout border-r'>
        <Tree
          className='p-2 overflow-hidden rounded-md bg-background'
          elements={ELEMENTS}
        >
          {renderFolderStructure(ELEMENTS)}
        </Tree>
      </div>
      <div className='h-full w-full'>
        <h5 className='text-lg pt-1 pb-2 px-2'>{selectedItem || 'Utitled file'}</h5>
        <Suspense fallback={<div>Loading...</div>}>
          <MonacoEditor
            language='plaintext'
            theme='vs-dark'
            value={'test'}
            options={{
              automaticLayout: true
            }}
          />
        </Suspense>
      </div>
    </main>
  )
}
