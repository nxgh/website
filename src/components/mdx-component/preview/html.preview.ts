const HTML_Template = (code: string) => `
<!DOCTYPE html>
<html lang="en">
<link href="https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css" rel="stylesheet" />
<style>html,body{ width: 100vw; height: 100vh}</style>
  ${code}
</html>
`

export default HTML_Template
