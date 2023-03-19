import { Octokit } from 'octokit'
import { replaceComment, replaceMetaRule, replacePreviewRule, splitFileBySection } from 'src/utils/parse-markdown'
import renderMDX from 'src/utils/render-mdx'
import MDXComponent from 'src/components/mdx-component'

import Layout from 'src/layout/doc'
import { pipe } from 'src/utils'
import octokit from 'src/api'

function Post(props: { code: string }) {
  return (
    <>
      <MDXComponent code={props.code} />
    </>
  )
}

Post.getLayout = (pages: any) => <Layout>{pages}</Layout>

export default Post

export async function getServerSideProps(content: { params: { id: string } }) {
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
