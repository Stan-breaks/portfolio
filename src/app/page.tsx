'use client'

import { useState, useEffect, useMemo, useRef, KeyboardEvent } from 'react'
import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({ subsets: ['latin'] })

// Updated ASCII art for the home section
const asciiArt = `
 ┌───────────────────────────────────────────────────┐
 │   _____        __ _                               │
 │  / ____|      / _| |                              │
 │ | (___   ___ | |_| |___      ____ _ _ __ ___      │
 │  \\___ \\ / _ \\|  _| __\\ \\ /\\ / / _\` | '__/ _ \\     │
 │  ____) | (_) | | | |_ \\ V  V / (_| | | |  __/     │
 │ |_____/ \\___/|_|  \\__| \\_/\\_/ \\__,_|_|  \\___|     │
 │                                                   │
 │              E N G I N E E R                      │
 └───────────────────────────────────────────────────┘
`

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState<string>('home')
  const [typedContent, setTypedContent] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const content = useMemo(() => ({
    home: `${asciiArt}

Welcome to Stanley's Software Engineering Portfolio
==================================================

Type 'help' to see available commands.
    `,
    about: `
About Stanley
=============

I'm a passionate backend developer with 2 years of experience in building
scalable and efficient server-side applications. With a strong foundation in
various Linux distributions and cloud technologies, I bring a comprehensive 
approach to software engineering. I'm also an open-source enthusiast, actively 
contributing to the community. My expertise includes:

- Designing robust APIs and optimizing database performance
- Developing efficient CLI and server applications using Go
- Implementing secure authentication systems
- Containerization and orchestration with Docker and Kubernetes
- Cloud infrastructure management, particularly with AWS services
- Proficient in Linux environments (Arch Linux, Ubuntu) and Windows Server
- Utilizing advanced development tools like Neovim, tmux, and LazyGit for efficient coding
- Contributing to open-source projects and engaging with the community
    `,
    skills: `
Technical Skills
================

Languages:     Python, JavaScript, TypeScript, Go, C, SQL
Frontend:      React.js, React TS, Next.js, Tailwind CSS, Sass
Backend:       Django, Node.js, Express, Go
Databases:     PostgreSQL, MongoDB, Redis, SQLite
DevOps:        Docker, Kubernetes, Git, Jenkins
Cloud:         AWS (EC2, S3), GCP
OS:            Linux (Arch Linux, Ubuntu), Windows Server
Dev Tools:     Neovim, tmux, LazyGit
Other:         RESTful APIs, Microservices Architecture, CLI Application Development
    `,
    projects: `
Notable Projects
================

1. High-Load E-commerce API (Node.js, Express, MongoDB)
   - Handled 1M+ daily requests
   - Implemented caching layer with Redis
   - GitHub: github.com/johndoe/ecommerce-api

2. Real-time Chat System (Go, WebSockets, Redis)
   - Supported 100k+ concurrent users
   - Utilized Redis pub/sub for message broadcasting
   - GitHub: github.com/johndoe/realtime-chat

3. Distributed Task Queue (Python, Celery, RabbitMQ)
   - Processed 5M+ background jobs daily
   - Implemented retry mechanism and dead letter queues
   - GitHub: github.com/johndoe/task-queue
    `,
    contact: `
Contact Information
===================

Email:    john.doe@example.com
GitHub:   github.com/johndoe
LinkedIn: linkedin.com/in/johndoe
Twitter:  @johndoe_dev

Feel free to reach out for collaborations or opportunities!
    `,
    help: `
Available commands:
===================

home     - Display home information
about    - Display information about John Doe
skills   - List technical skills
projects - Show notable projects
contact  - View contact information
clear    - Clear the terminal
help     - Show this help message
    `
  } as Record<string, string>), []);

  useEffect(() => {
    setTypedContent('')
    let i = 0
    const timer = setInterval(() => {
      if (i <= content[currentSection].length) {
        setTypedContent((prev) => content[currentSection].slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 10)
    return () => clearInterval(timer)
  }, [currentSection, content])

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = e.currentTarget.value.trim().toLowerCase()
      if (content[command]) {
        setCurrentSection(command)
      } else if (command === 'clear') {
        setTypedContent('')
      } else {
        setTypedContent((prev) => prev + `\n\nUnknown command: ${command}\nType 'help' for available commands.\n\n`)
      }
      setCommandHistory((prev) => [...prev, command])
      setHistoryIndex(-1)
      e.currentTarget.value = ''
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        setHistoryIndex((prev) => prev + 1)
        e.currentTarget.value = commandHistory[commandHistory.length - 1 - historyIndex - 1]
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > -1) {
        setHistoryIndex((prev) => prev - 1)
        e.currentTarget.value = historyIndex === 0 ? '' : commandHistory[commandHistory.length - 1 - historyIndex + 1]
      }
    }
  }

  // Simple ASCII-based animation
  useEffect(() => {
    const frames = ['|', '/', '-', '\\']
    let frameIndex = 0
    const animationTimer = setInterval(() => {
      setTypedContent((prev) => prev.replace(/[|/-\\]$/, frames[frameIndex]))
      frameIndex = (frameIndex + 1) % frames.length
    }, 250)

    return () => clearInterval(animationTimer)
  }, [])

  return (
    <div className={`min-h-screen bg-black text-green-500 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 ${firaCode.className}`}>
      <pre className="whitespace-pre-wrap mb-4">{typedContent}</pre>
      <div className="flex items-center">
        <span className="mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent border-none outline-none flex-grow text-green-500"
          onKeyDown={handleCommand}
          autoFocus
          aria-label="Command input"
        />
      </div>
    </div>
  )
}