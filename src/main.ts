import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('#app element not found')
}

app.innerHTML = `
  <main class="wrapper">
    <header>
      <p class="badge">Game 03</p>
      <h1>ターゲットハント</h1>
      <p class="lead">
        動き回るターゲットを制限時間30秒で何回倒せるか挑戦するミニゲームです。
        スタート後はターゲットが0.7秒ごとに移動するので集中力が試されます。
      </p>
    </header>

    <section class="card">
      <div class="stat-grid">
        <div>
          <p class="label">残り時間</p>
          <p id="time-display" class="value">30s</p>
        </div>
        <div>
          <p class="label">命中数</p>
          <p id="score-display" class="value">0</p>
        </div>
        <div>
          <p class="label">コンボ</p>
          <p id="combo-display" class="value">0</p>
        </div>
      </div>

      <div class="field" id="target-field">
        <button id="target" class="target" disabled>●</button>
      </div>

      <div class="control-row">
        <button id="start-btn" class="primary">スタート</button>
        <span class="hint">マウスを離すとコンボがリセットされます</span>
      </div>
    </section>
  </main>
`

const startBtn = document.querySelector<HTMLButtonElement>('#start-btn')
const targetBtn = document.querySelector<HTMLButtonElement>('#target')
const field = document.querySelector<HTMLDivElement>('#target-field')
const scoreDisplay = document.querySelector<HTMLParagraphElement>('#score-display')
const comboDisplay = document.querySelector<HTMLParagraphElement>('#combo-display')
const timeDisplay = document.querySelector<HTMLParagraphElement>('#time-display')

let moveTimer: number | null = null
let countdownTimer: number | null = null
let score = 0
let combo = 0
let timeLeft = 30

const stopGame = () => {
  if (moveTimer) {
    clearInterval(moveTimer)
    moveTimer = null
  }
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
  targetBtn?.setAttribute('disabled', 'true')
  startBtn?.removeAttribute('disabled')
}

const moveTarget = () => {
  if (!field || !targetBtn) return
  const fieldRect = field.getBoundingClientRect()
  const btnRect = targetBtn.getBoundingClientRect()
  const maxX = fieldRect.width - btnRect.width
  const maxY = fieldRect.height - btnRect.height
  const x = Math.random() * maxX
  const y = Math.random() * maxY
  targetBtn.style.transform = `translate(${x}px, ${y}px)`
}

startBtn?.addEventListener('click', () => {
  score = 0
  combo = 0
  timeLeft = 30
  scoreDisplay && (scoreDisplay.textContent = '0')
  comboDisplay && (comboDisplay.textContent = '0')
  timeDisplay && (timeDisplay.textContent = '30s')

  targetBtn?.removeAttribute('disabled')
  startBtn.setAttribute('disabled', 'true')
  moveTarget()

  if (moveTimer) clearInterval(moveTimer)
  if (countdownTimer) clearInterval(countdownTimer)

  moveTimer = window.setInterval(moveTarget, 700)
  countdownTimer = window.setInterval(() => {
    timeLeft -= 1
    if (timeDisplay) timeDisplay.textContent = `${timeLeft}s`
    if (timeLeft <= 0) {
      stopGame()
      timeDisplay && (timeDisplay.textContent = '0s')
    }
  }, 1000)
})

targetBtn?.addEventListener('click', () => {
  if (!targetBtn || targetBtn.disabled) return
  score += 1
  combo += 1
  scoreDisplay && (scoreDisplay.textContent = `${score}`)
  comboDisplay && (comboDisplay.textContent = `${combo}`)
  targetBtn.classList.add('hit')
  setTimeout(() => targetBtn.classList.remove('hit'), 160)
  moveTarget()
})

field?.addEventListener('mouseleave', () => {
  combo = 0
  comboDisplay && (comboDisplay.textContent = '0')
})
