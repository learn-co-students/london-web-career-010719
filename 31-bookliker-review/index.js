const listEl = document.querySelector('#list')
const showPanelEl = document.querySelector('#show-panel')

const booksUrl = `http://localhost:3000/books`

const currentUser = { "id": 1, "username": "pouros" }

const getBooks = () => fetch(booksUrl).then(res => res.json())

const renderBooksIntoList = books => {
    console.log(books)
    books.forEach(renderBookIntoList)
}

const renderBookIntoList = book => {
    const li = document.createElement('li')
    li.innerText = book.title
    listEl.append(li)
    li.addEventListener('click', showBookDetails(book))
}

const showBookDetails = book => event => {
    showPanelEl.innerHTML = ''

    const container = document.createElement('div')

    container.innerHTML = `
        <h2>${book.title}</h2>
        <img src="${book.img_url}" />
        <p>${book.description}</p>
        <ul id="liked-user-list">
            ${
        book.users.map(user => `<li>${user.username}</li>`).join('')
        }
        </ul>
    `
    const likeButton = document.createElement('button')
    likeButton.innerText = 'Like'

    likeButton.addEventListener('click', likeBook(book, currentUser))

    container.append(likeButton)
    showPanelEl.append(container)
}

const likeBook = (book, user) => event => {
    if (!book.users.map(u => u.id).includes(user.id)) {
        book.users.push(user)
    } else {
        book.users = book.users.filter(u => u.id !== user.id)
    }

    updateBookInAPI(book)
        .then(updateUserList)
}

const updateUserList = book => {
    const userList = document.querySelector('#liked-user-list')
    userList.innerHTML = book.users.map(user => `<li>${user.username}</li>`).join('')

}

const updateBookInAPI = book => fetch(`${booksUrl}/${book.id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
}).then(res => res.json())

getBooks()
    .then(renderBooksIntoList)


const spinImg = img => {
    img.classList.add('animated', 'jackInTheBox')
}

document.addEventListener('click', event => {
    if (event.target.tagName === 'IMG') {
        spinImg(event.target)
    }
})