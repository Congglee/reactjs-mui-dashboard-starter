import type { Task } from '@/types/mock-data.types'

const escapeCsvValue = (value: string | undefined | null) => {
  if (value === undefined || value === null) {
    return ''
  }
  const stringValue = String(value)
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  return stringValue
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

export const tasksToCSV = (tasks: Task[]) => {
  const headers = ['ID', 'Title', 'Category', 'Status', 'Priority', 'Assignee', 'Due Date', 'Created At', 'Updated At']

  const rows = tasks.map((task) => [
    escapeCsvValue(task.id),
    escapeCsvValue(task.title),
    escapeCsvValue(task.category),
    escapeCsvValue(task.status),
    escapeCsvValue(task.priority),
    escapeCsvValue(task.assignee),
    escapeCsvValue(formatDate(task.dueDate)),
    escapeCsvValue(formatDate(task.createdAt)),
    escapeCsvValue(formatDate(task.updatedAt))
  ])

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')
  return csvContent
}

export const downloadTasksAsCSV = (tasks: Task[], filename: string = 'tasks') => {
  const csvContent = tasksToCSV(tasks)
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const generatePrintHTML = (tasks: Task[]) => {
  const taskRows = tasks
    .map(
      (task) => `
      <tr>
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td><span class="chip chip-${task.category.toLowerCase()}">${task.category}</span></td>
        <td><span class="chip chip-${task.status.toLowerCase().replace(' ', '-')}">${task.status}</span></td>
        <td><span class="chip chip-priority-${task.priority.toLowerCase()}">${task.priority}</span></td>
        <td>${task.assignee || '-'}</td>
        <td>${formatDate(task.dueDate) || '-'}</td>
      </tr>
    `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tasks Report</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          padding: 24px;
          color: #1a1a1a;
          background: #fff;
        }
        .header {
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e0e0e0;
        }
        .header h1 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .header p {
          font-size: 14px;
          color: #666;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        th, td {
          padding: 12px 8px;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }
        th {
          background-color: #f5f5f5;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.5px;
          color: #666;
        }
        tr:hover {
          background-color: #fafafa;
        }
        .chip {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
        }
        .chip-documentation { background: #e3f2fd; color: #1565c0; }
        .chip-bug { background: #ffebee; color: #c62828; }
        .chip-feature { background: #e8f5e9; color: #2e7d32; }
        .chip-todo { background: #fff3e0; color: #ef6c00; }
        .chip-in-progress { background: #e3f2fd; color: #1565c0; }
        .chip-done { background: #e8f5e9; color: #2e7d32; }
        .chip-canceled { background: #fafafa; color: #757575; }
        .chip-backlog { background: #fce4ec; color: #ad1457; }
        .chip-priority-high { background: #ffebee; color: #c62828; }
        .chip-priority-medium { background: #fff3e0; color: #ef6c00; }
        .chip-priority-low { background: #e8f5e9; color: #2e7d32; }
        .footer {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #e0e0e0;
          font-size: 12px;
          color: #999;
          text-align: center;
        }
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Tasks Report</h1>
        <p>Generated on ${new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })} • Total: ${tasks.length} tasks</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          ${taskRows}
        </tbody>
      </table>
      <div class="footer">
        Tasks Management System • Printed Report
      </div>
    </body>
    </html>
  `
}

export const printTasks = (tasks: Task[]) => {
  const printWindow = window.open('', '_blank', 'width=900,height=700')
  if (!printWindow) {
    alert('Please allow popups to print tasks.')
    return
  }

  printWindow.document.write(generatePrintHTML(tasks))
  printWindow.document.close()

  printWindow.onload = () => {
    printWindow.focus()
    printWindow.print()
  }
}
