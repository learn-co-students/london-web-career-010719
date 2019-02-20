const rootEl = document.querySelector('#root')

function createArticle (imgSrc, content) {
  // creation stage
  const divEl = document.createElement('div')
  const imgEl = document.createElement('img')
  const pEl = document.createElement('p')
  
  // editing stage
  divEl.className = 'article'
  imgEl.className = 'image'
  pEl.className = 'content'
  
  imgEl.src = imgSrc
  pEl.innerText = content
  
  // appending stage
  divEl.append(imgEl, pEl)
  
  rootEl.appendChild(divEl)
}

function createArticleWithInnerHTML (imgSrc, content) {
  rootEl.innerHTML += `
    <div class="article">
      <img class="image" src="${imgSrc}">
      <p class="content">${content}</p>
    </div>
  `
}


function createArticleHybrid (imgSrc, content) {
  const divEl = document.createElement('div')
  divEl.className = 'article'

  divEl.innerHTML = `
    <img class="image" src="${imgSrc}">
    <p class="content">${content}</p>
  `

  divEl.querySelector('img')
  rootEl.appendChild(divEl)
}

createArticle('https://cdn.stuff-fibre.co.nz/web/img/web-rebrand/resize/oli-address-check-dropshadow.png', "octo!")
createArticleWithInnerHTML('https://cdn.stuff-fibre.co.nz/web/img/web-rebrand/resize/oli-address-check-dropshadow.png', "octo!")
createArticleHybrid('https://cdn.stuff-fibre.co.nz/web/img/web-rebrand/resize/oli-address-check-dropshadow.png', "octo!")
