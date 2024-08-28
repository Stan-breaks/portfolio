'use client'

import { useState, useEffect, useMemo, useRef, KeyboardEvent } from 'react'
import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({ subsets: ['latin'] })

// ASCII art for larger screens
const largeScreenAsciiArt = `
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

// Simplified ASCII art for mobile screens
const smallScreenAsciiArt = `
┌─────────────┐
│  Software     │
│  Engineer     │
└─────────────┘
`

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState<string>('home')
  const [typedContent, setTypedContent] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isLargeScreen, setIsLargeScreen] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 640)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const content = useMemo(() => ({
    home: `
${isLargeScreen ? largeScreenAsciiArt : smallScreenAsciiArt}

Hi, I'm Stanley Mwendwa!
Welcome to my Software Engineering Portfolio
============================================

Type 'help' to see available commands.

Note: All links in this portfolio are clickable.

Hint: Type 'about' to know about me. 
  `,
    about: `
About Me
========

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

Hint: Type 'skills' to see my technical skills.
  `,
    skills: `
Technical Skills
================

Languages:     Python, JavaScript, TypeScript, Go, C, SQL, Bash
Frontend:      React.js, React TS, Next.js, Tailwind CSS, Sass
Backend:       Django, Node.js, Express, Go
Databases:     PostgreSQL, MongoDB, Redis, SQLite
DevOps:        Docker, Git
Cloud:         AWS (EC2, S3), GCP
OS:            Linux (Arch Linux, Ubuntu), Windows Server
Dev Tools:     Neovim, tmux, LazyGit
Other:         RESTful APIs, Microservices Architecture, CLI Application Development, Bash Scripting, Automation

Hint: Type 'projects' to view my portfolio projects.
  `,
    projects: `
Projects
========

Backend Development:
--------------------
1. Bare-Bones HTTP Server (Go)
   - Minimalistic HTTP server built from scratch
   - Supports basic HTTP methods and file operations
   - Features: root serving, echo with gzip, file storage, user-agent info
   - GitHub: <a href="https://github.com/Stan-breaks/http-server-go" target="_blank" rel="noopener noreferrer">github.com/Stan-breaks/bare-bones-http-server</a>

2. Pomo - Pomodoro Technique CLI Tool (Go)
   - Command-line tool for time management using the Pomodoro Technique
   - Features: Custom schedules, ASCII countdown timer, easy-to-use interface
   - GitHub: <a href="https://github.com/Stan-breaks/pomodoro" target="_blank" rel="noopener noreferrer">github.com/Stan-breaks/pomodoro</a>

Full-Stack Applications:
------------------------
3. CrowdSource Health (React.ts, Node.js, Python, MongoDB)
   - Community-driven website for aggregating and sharing health information
   - Features: Interactive health mapping, user-driven forums, anonymous symptom reporting
   - Stack: React.ts (Frontend), Node.js (Backend), Python with Flask (USSD server), MongoDB (Database)
   - GitHub: <a href="https://github.com/Stan-breaks/crowd_source" target="_blank" rel="noopener noreferrer">github.com/Stan-breaks/crowdsource-health</a>
   - Live Demo: <a href="https://crowd-source-xi.vercel.app/" target="_blank" rel="noopener noreferrer">crowdsource-health.vercel.app</a>

4. Nexaplan (React, Vite, Django)
   - Project and task management system with frontend and backend implementations
   - Stack: React and Vite (Frontend), Django and Django REST framework (Backend)
   - Features: Task organization, project management, user authentication
   - GitHub: <a href="https://github.com/Stan-breaks/Nexaplan-Front-end" target="_blank" rel="noopener noreferrer">[github.com/Stan-breaks/Nexaplan-Front-end]</a> <a href="https://github.com/Stan-breaks/NexaplanBackend" target="_blank" rel="noopener noreferrer">[github.com/Stan-breaks/NexaplanBackend]</a>
   - Live Demo: <a href="https://nexaplan-front-end.vercel.app" target="_blank" rel="noopener noreferrer">nexaplan-front-end.vercel.app</a>

Customization:
--------------
5. Tokyo Night Fox - Custom Firefox Theme
   - Firefox theme inspired by the "Tokyo Night" color scheme
   - Features: Reorganized toolbar, customized tab appearance, minimalist design
   - Includes custom new tab page and animated hover effects
   - GitHub: <a href="https://github.com/Stan-breaks/Tokyo-night-Fox" target="_blank" rel="noopener noreferrer">github.com/Stan-breaks/Tokyo-night-Fox</a>

Hint: Type 'resume' to view my resume.
  `,
    contact: `
Contact Information
===================

Email:    <a href="mailto:stanleymwendwa03@gmail.com">stanleymwendwa03@gmail.com</a>
GitHub:   <a href="https://github.com/Stan-breaks" target="_blank" rel="noopener noreferrer">github.com/Stan-breaks</a>
LinkedIn: <a href="https://www.linkedin.com/in/stanley-mwendwa-5a594b233/" target="_blank" rel="noopener noreferrer">linkedin.com/in/stanleymwendwa</a>

Feel free to reach out for collaborations or opportunities!

Hint: Type 'home' to return to the main screen.
  `,
    resume: `
Resume
======

You can download my resume to learn more about my professional experience and qualifications.

Download: <a href="https://drive.google.com/file/d/1PmcFf7lMuymixuATfSLhKoM-ysEKGZ_K/view?usp=sharing" target="_blank" rel="noopener noreferrer" download>Stanley_Mwendwa_Resume.pdf</a>

Note: The resume is in PDF format. Make sure you have a PDF viewer installed.

Hint: Type 'contact' to see my contact information.
  `,
    help: `
Available commands:
===================

home        - Display home information
about       - Display information about Stanley
skills      - List technical skills
projects    - Show Stanley's projects
resume      - Download Stanley's resume
contact     - View contact information
clear       - Clear the terminal
help        - Show this help message

Hint: Try exploring each section to learn more about Stanley's portfolio.
  `
  } as Record<string, string>), [isLargeScreen]);

  useEffect(() => {
    setTypedContent('')
    let i = 0
    const timer = setInterval(() => {
      if (i <= content[currentSection].length) {
        setTypedContent((prev) => {
          const newContent = content[currentSection].slice(0, i)
          // Scroll to the bottom after each update
          setTimeout(() => {
            if (contentRef.current) {
              contentRef.current.scrollTop = contentRef.current.scrollHeight
            }
          }, 0)
          return newContent
        })
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
      <pre
        ref={contentRef}
        className="whitespace-pre-wrap mb-4 max-h-[80vh] overflow-y-auto"
        dangerouslySetInnerHTML={{ __html: typedContent }}
      ></pre>
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
