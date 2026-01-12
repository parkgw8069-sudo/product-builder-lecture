class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .lotto-card {
                    background: var(--white);
                    padding: 2rem;
                    border-radius: 1rem;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    text-align: center;
                }

                h1 {
                    color: var(--primary-color);
                    margin-bottom: 1.5rem;
                }

                #lotto-numbers {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .lotto-ball {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: var(--lotto-ball-color);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--text-color);
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
                }

                button:hover {
                    background-color: #45a049;
                }
            </style>
            <div class="lotto-card">
                <h1>로또 번호 추첨기</h1>
                <div id="lotto-numbers"></div>
                <button id="generate-btn">번호 추첨</button>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.getElementById('generate-btn').addEventListener('click', () => this.generateNumbers());
    }

    generateNumbers() {
        const lottoNumbers = new Set();
        while(lottoNumbers.size < 6) {
            lottoNumbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const numbersContainer = this.shadowRoot.getElementById('lotto-numbers');
        numbersContainer.innerHTML = '';
        Array.from(lottoNumbers).sort((a,b) => a-b).forEach(number => {
            const ball = document.createElement('div');
            ball.classList.add('lotto-ball');
            ball.textContent = number;
            numbersContainer.appendChild(ball);
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);
