export class TaskController {
	getAllTasks = () => {
		return [
			'Сделать проектную работу',
			'Полить цветы',
			'Пройти туториал по Реакту',
			'Сделать фронт для своего проекта',
			'Прогуляться по улице в солнечный день',
			'Помыть посуду',
		]
	}

	setTask = taskName => {
		return 'Успешно добалено'
	}

	deleteTask = (taskId, taskName) => {
		return 'Успешно добалено'
	}

	updateTask = (taskId, taskName) => {
		return 'Успешно добалено'
	}
}
