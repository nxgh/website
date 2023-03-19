export type IndexProps = {
  filename: string
  code: string
  layout: 'default' | 'refs' | 'ppt'
  meta: any
  fileList: {
    title: string
    dir: string
    meta: {
      tags?: string[]
      key?: string[]
      search?: string[]
      date?: string
    }
  }[]
}

export type FileList = IndexProps['fileList']
