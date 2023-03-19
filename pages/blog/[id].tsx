import { useRouter } from 'next/router'
import { Octokit } from 'octokit'
import { useEffect, useState } from 'react'
import { replaceComment, replaceMetaRule, replacePreviewRule, splitFileBySection } from 'src/utils/parse-markdown'
import renderMDX from 'src/utils/render-mdx'
import MDXComponent from 'src/components/mdx-component'

import Layout from 'src/layout/doc'
import { pipe } from 'src/utils'

const octokit = new Octokit({
  auth: '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',
})

function Post(props) {
  return (
    <>
      <MDXComponent code={props.code} />
    </>
  )
}

Post.getLayout = (pages) => <Layout>{pages}</Layout>

export default Post

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

  const file = pipe(splitFileBySection, (content: string) =>
    replaceComment(content, [replacePreviewRule, replaceMetaRule])
  )(data)

  const { code } = await renderMDX(file)

  return {
    props: { code }, // will be passed to the page component as props
  }
}
