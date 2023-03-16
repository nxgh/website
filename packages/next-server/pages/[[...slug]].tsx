import type { GetStaticPaths, GetStaticProps } from 'next'

import { getStaticPathsFiles, getStaticPropsFileDetail, getStaticPropsFiles } from 'src/utils/getStaticFile'

import { MarkdownHelper } from 'src/utils/parse-markdown'
import renderMDX from 'src/utils/render-mdx'
import MDXComponent from 'src/components/mdx-component'
import Layout from 'src/components/layout'

import type { IndexProps } from 'src/components/files'

export default function Index(props: IndexProps) {
  return (
    <>
      <Layout fileList={props.fileList}>{props.code && <MDXComponent code={props.code} />}</Layout>
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
    props: {
      code,
      fileList,
      file: content,
    },
  }
}
