import { Octokit } from 'octokit'

const octokit = new Octokit({
  auth: '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',
})

export default async function handler(req, res) {
  const { data } = await octokit.rest.repos.getContent({
    mediaType: {
      format: 'raw',
    },
    owner: 'nxgh',
    repo: 'notes',
    path: '',
  })
  res.status(200).json({ data })
}
