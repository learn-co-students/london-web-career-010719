Dog.destroy_all
Person.destroy_all
Toy.destroy_all
Walk.destroy_all

dogs = [
  {name: 'Courage', age: 6},
  {name: 'Lassie', age: 34},
  {name: 'Dog 1', age: 1},
  {name: 'Dog 56', age: 5},
  {name: 'Clifford', age: 1}
]

Dog.create(dogs)

people = [
  {name: 'Dan'},
  {name: 'Ben'},
  {name: 'Bobert'},
  {name: 'Brüno'}
]

Person.create(people)

toys = [
  {name: 'Brüno\'s shoe', dog_id: Dog.first.id},
  {name: 'Brüno\'s other shoe', dog_id: Dog.first.id},
  {name: 'A piece of string', dog_id: Dog.first.id}
]

Toy.create(toys)

walks = [
  {person_id: Person.first.id, dog_id: Dog.first.id, minutes: 15},
  {person_id: Person.second.id, dog_id: Dog.first.id, minutes: 10},
  {person_id: Person.third.id, dog_id: Dog.first.id, minutes: 666},
  {person_id: Person.second.id, dog_id: Dog.second.id, minutes: 438},
  {person_id: Person.second.id, dog_id: Dog.third.id, minutes: 1}
]

Walk.create(walks)
