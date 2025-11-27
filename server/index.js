const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const cors = require('cors')

const port = 3000

app.use(express.json())
app.use(cors())

const dbPath = path.join(__dirname, 'tasks.db')
const db = new sqlite3.Database(dbPath)

db.serialize(() => {
	db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
})

app.get('/api/getAllTasks', (req, res) => {
	db.all('SELECT * FROM tasks ORDER BY created_at DESC', (err, rows) => {
		if (err) return res.status(500).json({ error: err.message })

		res.json({
			message: 'Success',
			data: rows,
		})
	})
})
app.post('/api/setTask', (req, res) => {
	const { name } = req.body

	if (!name) {
		return res.status(400).json({ error: 'Name is required' })
	}

	db.run('INSERT INTO tasks (name) VALUES (?)', [name], err => {
		if (err) return res.status(500).json({ error: err.message })

		res.json({
			message: 'Task created successfully',
			data: {
				id: this.lastID,
				name: name,
			},
		})
	})
})
app.delete('/api/deleteTask', (req, res) => {
	const { id } = req.body

	if (!id) {
		return res.status(400).json({ error: 'ID is required' })
	}

	db.run('DELETE FROM tasks WHERE id = ?', [id], err => {
		if (err) return res.status(500).json({ error: err.message })

		if (this.changes === 0)
			return res.status(404).json({ error: 'Task not found' })

		res.json({
			message: 'Task deleted successfully',
			data: { id: id },
		})
	})
})
app.put('/api/updateTask', (req, res) => {
	const { id, name } = req.body

	if (!id || !name)
		return res.status(400).json({ error: 'ID and name are required' })

	db.run('UPDATE tasks SET name = ? WHERE id = ?', [name, id], err => {
		if (err) return res.status(500).json({ error: err.message })

		if (this.changes === 0)
			return res.status(404).json({ error: 'Task not found' })

		res.json({
			message: 'Task updated successfully',
			data: {
				id: id,
				name: name,
			},
		})
	})
})

app.get('/api/setTestData', (req, res) => {
	db.run(
		'INSERT INTO tasks (name) VALUES ("1 задача"), ("2 задача"), ("3 задача")',
		[],
		err => {
			if (err) return res.status(500).json({ error: err.message })

			res.json({
				message: 'Test tasks created successfully',
			})
		}
	)
})

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})

process.on('SIGINT', () => {
	db.close(err => {
		if (err) {
			console.error(err.message)
		}
		console.log('Database connection closed')
		process.exit(0)
	})
})
