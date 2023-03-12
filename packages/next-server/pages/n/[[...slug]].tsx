import { PropsWithChildren, useState } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'

import { getStaticPathsFiles, getStaticPropsFileDetail, getStaticPropsFiles } from 'src/utils/getStaticFile'
import { useRouter } from 'next/router'
import { MarkdownHelper } from 'mdx'
import renderMDX from 'src/utils/render-mdx'
import MDXComponent from 'src/components/mdx-component'
import createLayout from 'src/components/layout'

type IProps = PropsWithChildren<{
  filename: string
  code: string
  layout: 'default' | 'refs' | 'ppt'
  meta: any
  fileList: { title: string; dir: string; meta: string[] }[]
}>

const { Layout, Header, Aside, Main } = createLayout()

export default function Index(props: IProps) {
  const [selected, setSelected] = useState([...props.fileList])

  const router = useRouter()
  return (
    <>
      <Layout>
        <Header></Header>
        <Aside>
          <section className="h-full overflow-auto">
            <div>
              {selected.map((i, index) => {
                const title = i.title.replace(/\.mdx?/, '')
                return (
                  <div
                    className="font-loveisfree tracking-wide text-xl border-b-1 cursor-pointer light:hover:bg-gray-100 dark:hover:bg-gray-800"
                    key={`${i.dir}-${i.title}-${index}`}
                    onClick={() => router.push(`/n/${title}`)}
                  >
                    {title}
                  </div>
                )
              })}
            </div>
          </section>
        </Aside>
        <Main>

        </Main>
        {props.code && <MDXComponent code={props.code} />}
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = getStaticPathsFiles()

  const defaultPath = {
    params: { slug: [''] },
  }

  const paths = files.map((item) => ({
    params: { slug: [item.title.replace(/\.mdx|\.md/, '')] },
  }))
  return {
    paths: [defaultPath, ...paths],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params!.slug as string[]

  const fileList = getStaticPropsFiles()

  if (!slug) {
    // index 列表布局
    return {
      props: {
        code: '',
        fileList,
      },
    }
  }

  const id = slug.join('/')

  const file = getStaticPropsFileDetail(id)
  const markdownHelper = new MarkdownHelper(file)

  const {
    file: content,
    meta: { tags, search },
  } = markdownHelper.parse_meta().split_file_by_section().replace_preview().get()

  const { code } = await renderMDX(content)

  return {
    // props: { code, data, layout: file[0]?.meta?.layout || 'default', meta },
    props: {
      code,
      fileList,
      file: content,
    },
  }
}
