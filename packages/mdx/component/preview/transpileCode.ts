import { Options, Transform, transform } from 'sucrase'


function transpileCode(code: string, opts?: Options) {
  const transformed = transform(code, {
    ...opts,
    transforms: ['jsx'] as Transform[],
  })
  return transformed
}

export default transpileCode
