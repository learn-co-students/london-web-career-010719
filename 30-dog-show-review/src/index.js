
const dogTable = document.querySelector('#table-body')
const dogForm = document.querySelector('#dog-form')

const dogsUrl = 'http://localhost:3000/dogs'

let selectedDog = undefined

const getDogs = () => fetch(dogsUrl).then(res => res.json())
const renderDogs = dogs => dogs.forEach(renderDog)


const dogRowHtml = dog => `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td>`

const renderDog = dog => {

    const tr = document.createElement('tr')
    tr.dataset.dogId = dog.id
    tr.innerHTML = dogRowHtml(dog)

    tr.querySelector('button').addEventListener('click', event => {

        selectDog(dog)
    })

    dogTable.append(tr)
}

const selectDog = dog => {
    selectedDog = dog
    populateFormWithDogData(dog)
}

const populateFormWithDogData = dog => {
    dogForm.name.value = dog.name
    dogForm.breed.value = dog.breed
    dogForm.sex.value = dog.sex
}

dogForm.addEventListener('submit', event => {
    event.preventDefault()
    selectedDog.name = event.target.name.value
    selectedDog.breed = event.target.breed.value
    selectedDog.sex = event.target.sex.value
    updateDogInAPI(selectedDog)
        .then(updateDogRowInTable)
})

function updateDogInAPI(dog) {

}

let updateDogInAPI = function (dog) {

}

const updateDogInAPI = dog => fetch(
    `${dogsUrl}/${dog.id}`,
    {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dog)
    }
)
    .then(res => res.json())

const updateDogRowInTable = dog => {
    const dogRow = document.querySelector(`tr[data-dog-id="${dog.id}"]`)
    dogRow.innerHTML = dogRowHtml(dog)
}

getDogs()
    .then(dogs => renderDogs(dogs))