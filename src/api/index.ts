import { Octokit } from 'octokit'
import dotenv from 'dotenv'

dotenv.config()

const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN,
})

export default octokit
