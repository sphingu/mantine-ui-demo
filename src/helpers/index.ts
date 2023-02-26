export * as githubOAuthHelpers from './github-oauth'
export * as notifyHelper from './notify'

export const sleep = (seconds = 1) =>
  new Promise((res) => {
    setTimeout(() => {
      res(undefined)
    }, seconds * 1000)
  })
