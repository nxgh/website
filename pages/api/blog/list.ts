import octokit from 'src/api'

async function getPosts(path = '', result: unknown[] = []) {
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
    owner: 'nxgh',
    repo: 'notes',
    tree_sha: 'master',
    mediaType: {
      format: 'raw',
    },
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  return data
}

export default async function handler(req: any, res: any) {
  const data = await getPosts()
  const response = data.tree.reduce((resp, item) => {
    if (item.path!.endsWith('.md') || item.path!.endsWith('.mdx')) {
      resp.push({
        title: item.path!.replace('.md', '').replace('.mdx', ''),
        path: item.path!,
      })
    }
    return resp
  }, [] as { title: string; path: string }[])
  res.status(200).json({ data: response })
}
