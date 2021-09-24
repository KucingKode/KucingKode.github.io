const ghpages = require('gh-pages')

ghpages.publish(
  'public',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/KucingKode/KucingKode.github.io.git'
  },
  () => {
    console.log('Deploy Complete!')
  }
)
