let items = [
	'Сделать проектную работу',
	'Полить цветы',
	'Пройти туториал по Реакту',
	'Сделать фронт для своего проекта',
	'Прогуляться по улице в солнечный день',
	'Помыть посуду',
]

const listElement = document.querySelector('.to-do__list')
const formElement = document.querySelector('.to-do__form')
const inputElement = document.querySelector('.to-do__input')

listElement.innerHTML = 'Загрузка задач'
const loadTasks = () => {
	fetch('http://127.0.0.1:3000/api/getAllTasks')
		.then(responce => responce.json())
		.then(data => {
			listElement.innerHTML = ''
			data.data.forEach(el => {
				listElement.append(createItem(el.name))
			})
		})
}

loadTasks()

function createItem(item) {
	const template = document.getElementById('to-do__item-template')
	const clone = template.content.querySelector('.to-do__item').cloneNode(true)
	const textElement = clone.querySelector('.to-do__item-text')
	const deleteButton = clone.querySelector('.to-do__item-button_type_delete')
	const duplicateButton = clone.querySelector(
		'.to-do__item-button_type_duplicate'
	)
	const editButton = clone.querySelector('.to-do__item-button_type_edit')

	deleteButton.addEventListener('click', () => {
		clone.remove()
		items = getTasksFromDOM()
		saveTasks(items)
	})

	duplicateButton.addEventListener('click', () => {
		let newItem = createItem(item)
		listElement.prepend(newItem)
		items = getTasksFromDOM()
		saveTasks(items)
	})

	editButton.addEventListener('click', () => {
		textElement.setAttribute('contenteditable', true)
		textElement.focus()
	})

	textElement.addEventListener('blur', () => {
		textElement.setAttribute('contenteditable', false)
		items = getTasksFromDOM()
		saveTasks(items)
	})

	textElement.textContent = item
	return clone
}

formElement.addEventListener('submit', e => {
	e.preventDefault()

	let text = inputElement.value
	if (text == '') return

	saveTask(text)

	inputElement.value = ''
})

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text')

	tasks = []

	itemsNamesElements.forEach(el => {
		tasks.push(el.textContent)
	})

	return tasks
}

const saveTask = task => {
	fetch('http://127.0.0.1:3000/api/setTask', {
		method: 'POST',
		body: JSON.stringify({
			name: task,
		}),
	}).then(response => loadTasks())
}
