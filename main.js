class DinnerRoulette extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .dinner-card {
                    background: var(--white);
                    padding: 2rem;
                    border-radius: 1rem;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    text-align: center;
                    width: 300px;
                }

                h1 {
                    color: var(--primary-color);
                    margin-bottom: 1.5rem;
                }

                #dinner-result {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--text-color);
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                button {
                    background-color: var(--primary-color);
                    color: var(--white);
                    border: none;
                    padding: 0.75rem 1.5rem;
                    font-size: 1rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    margin-top: 1.5rem;
                }

                button:hover {
                    background-color: #45a049;
                }
            </style>
            <div class="dinner-card">
                <h1>오늘 저녁 뭐 먹지?</h1>
                <div id="dinner-result"></div>
                <button id="generate-btn">메뉴 추천</button>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.getElementById('generate-btn').addEventListener('click', () => this.generateDinner());
    }

    generateDinner() {
        const dinnerOptions = [
            '치킨', '피자', '삼겹살', '떡볶이', '짜장면', 
            '짬뽕', '김치찌개', '된장찌개', '부대찌개', '초밥', 
            '파스타', '햄버거', '국밥', '냉면', '갈비'
        ];
        const resultContainer = this.shadowRoot.getElementById('dinner-result');
        resultContainer.textContent = '';

        let count = 0;
        const interval = setInterval(() => {
            const option1 = dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)];
            let option2 = dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)];
            while (option1 === option2) { // Ensure distinct options during animation
                option2 = dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)];
            }
            resultContainer.textContent = `${option1}, ${option2}`;
            count++;
            if (count > 20) {
                clearInterval(interval);
                const selected = new Set();
                while (selected.size < 2) {
                    selected.add(dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)]);
                }
                const [finalOption1, finalOption2] = Array.from(selected);
                resultContainer.textContent = `${finalOption1}, ${finalOption2}`;
            }
        }, 100);
    }
}


customElements.define('dinner-roulette', DinnerRoulette);

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themes = ['light', 'dark', 'red'];

// Function to apply theme
function applyTheme(theme) {
    body.classList.remove('theme-dark', 'theme-red'); // Remove existing theme classes
    if (theme === 'dark') {
        body.classList.add('theme-dark');
    } else if (theme === 'red') {
        body.classList.add('theme-red');
    }
    localStorage.setItem('theme', theme);
}

// Load theme from localStorage
let currentTheme = localStorage.getItem('theme');
if (!currentTheme || !themes.includes(currentTheme)) {
    currentTheme = 'light'; // Default to light if no theme or invalid theme
}
applyTheme(currentTheme);


themeToggle.addEventListener('click', () => {
    let currentThemeIndex = themes.indexOf(localStorage.getItem('theme') || 'light');
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    const nextTheme = themes[nextThemeIndex];
    applyTheme(nextTheme);
});