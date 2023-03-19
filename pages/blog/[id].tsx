// import { use } from 'react'
// import { getPosts } from './api'
import { useRouter } from 'next/router'
import { Octokit } from 'octokit'
import { useEffect, useState } from 'react'
import { MarkdownHelper } from 'src/utils/parse-markdown'
import renderMDX from 'src/utils/render-mdx'
import MDXComponent from 'src/components/mdx-component'
const octokit = new Octokit({
  auth: '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',
})

export default function Index(props) {
  return (
    <>
      <MDXComponent code={props.code} />
      {/* {props.data} */}
    </>
  )
}

export async function getServerSideProps(content) {
  const path = content.params.id
  //   async function getPost(contentPath: string) {
  const { data } = await octokit.rest.repos.getContent({
    mediaType: {
      format: 'raw',
    },
    owner: 'nxgh',
    repo: 'notes',
    path,
  })

  const markdownHelper = new MarkdownHelper(data)
  const {
    file,
    meta: { tags, search },
  } = markdownHelper.parse_meta().split_file_by_section().replace_preview().get()

  const { code } = await renderMDX(file)

  return {
    props: { code }, // will be passed to the page component as props
  }
}
