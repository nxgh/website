import Layout from 'src/layout/doc'

export default function BlogIndex() {
  return <>Index</>
}

BlogIndex.getLayout = (pages: any) => <Layout>{pages}</Layout>
