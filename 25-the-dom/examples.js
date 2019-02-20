// fixing the BBC

const fixTopBBCStory = () => {
  const imageUrl = 'https://avatars2.githubusercontent.com/u/16916098?s=460&v=4'
  const topStoryEl = document.querySelector('.top-story__wrapper')
  const topStoryImageEl = topStoryEl.querySelector('.top-story__image')
  const topStoryTitleEl = topStoryEl.querySelector('.top-story__title')

  topStoryImageEl.style.backgroundImage = `url(${imageUrl})`
  topStoryTitleEl.innerText = "Nicolas becomes favourite instructor."
}

const makeAllDivsGreatAgain = () => {
  const imageUrl = 'https://avatars2.githubusercontent.com/u/16916098?s=460&v=4'
  const allTheDivs = document.querySelectorAll('div')

  allTheDivs.forEach(div => div.style.backgroundImage = `url(${imageUrl})`)
}

// fixing Twitter
function fixTweet () {
  const tweetEls = document.querySelectorAll('.content')
  const tweetEl = tweetEls[10]
  const tweetText = tweetEl.querySelector('p')
  tweetText.innerText = "I just can't believe how quickly Nicolas became favourite lead instructor. This is huge! So proud, I'm so proud."
}
