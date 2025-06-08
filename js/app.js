/**
 * Quiz Game - Main Application
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Elementos da interface
    const screens = {
        start: document.getElementById('start-screen'),
        name: document.getElementById('name-screen'),
        nameConfirm: document.getElementById('name-confirm-screen'),
        quiz: document.getElementById('quiz-screen'),
        result: document.getElementById('result-screen'),
        ranking: document.getElementById('ranking-screen')
    };

    // Botões
    const buttons = {
        start: document.getElementById('start-btn'),
        ranking: document.getElementById('ranking-btn'),
        nameSubmit: document.getElementById('name-submit'),
        nameBack: document.getElementById('name-back'),
        confirmYes: document.getElementById('confirm-yes'),
        confirmNo: document.getElementById('confirm-no'),
        menu: document.getElementById('menu-btn'),
        restart: document.getElementById('restart-btn'),
        quit: document.getElementById('quit-btn'),
        resultOk: document.getElementById('result-ok'),
        rankingBack: document.getElementById('ranking-back')
    };

    // Elementos do quiz
    const elements = {
        playerName: document.getElementById('player-name'),
        nameError: document.getElementById('name-error'),
        currentScore: document.getElementById('current-score'),
        timer: document.getElementById('timer'),
        menuPopup: document.getElementById('menu-popup'),
        questionText: document.getElementById('question-text'),
        answers: document.querySelectorAll('.answer'),
        currentQuestion: document.getElementById('current-question'),
        totalQuestions: document.getElementById('total-questions'),
        resultName: document.getElementById('result-name'),
        resultScore: document.getElementById('result-score'),
        resultTime: document.getElementById('result-time'),
        rankingBody: document.getElementById('ranking-body')
    };

    // Estado do jogo
    const gameState = {
        playerName: '',
        score: 0,
        currentQuestionIndex: 0,
        selectedQuestions: [],
        startTime: 0,
        timerInterval: null,
        elapsedSeconds: 0,
        answersEnabled: true
    };

    // Inicializa o banco de dados
    try {
        await dbManager.init();
        console.log('Banco de dados inicializado com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
        alert('Erro ao inicializar o banco de dados. O jogo pode não funcionar corretamente.');
    }

    // Função para mostrar uma tela específica
    function showScreen(screenId) {
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active');
        });
        screens[screenId].classList.add('active');
    }

    // Função para selecionar aleatoriamente 5 perguntas
    function selectRandomQuestions() {
        // Cria uma cópia do array de perguntas
        const shuffledQuestions = [...quizQuestions];
        
        // Embaralha o array
        for (let i = shuffledQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
        }
        
        // Seleciona as primeiras 5 perguntas
        return shuffledQuestions.slice(0, 5);
    }

    // Função para iniciar o cronômetro
    function startTimer() {
        gameState.startTime = Date.now();
        gameState.elapsedSeconds = 0;
        
        if (gameState.timerInterval) {
            clearInterval(gameState.timerInterval);
        }
        
        gameState.timerInterval = setInterval(() => {
            gameState.elapsedSeconds = Math.floor((Date.now() - gameState.startTime) / 1000);
            updateTimerDisplay();
        }, 1000);
        
        updateTimerDisplay();
    }

    // Função para parar o cronômetro
    function stopTimer() {
        if (gameState.timerInterval) {
            clearInterval(gameState.timerInterval);
            gameState.timerInterval = null;
        }
    }

    // Função para atualizar o display do cronômetro
    function updateTimerDisplay() {
        const minutes = Math.floor(gameState.elapsedSeconds / 60);
        const seconds = gameState.elapsedSeconds % 60;
        elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Função para carregar uma pergunta
    function loadQuestion() {
        const question = gameState.selectedQuestions[gameState.currentQuestionIndex];
        
        elements.questionText.textContent = question.question;
        elements.currentQuestion.textContent = gameState.currentQuestionIndex + 1;
        elements.totalQuestions.textContent = gameState.selectedQuestions.length;
        
        // Carrega as opções de resposta
        elements.answers.forEach((answerElement, index) => {
            const optionText = question.options[index];
            const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
            
            answerElement.querySelector('.option').textContent = optionLetter;
            answerElement.querySelector('.answer-text').textContent = optionText;
            
            // Limpa classes anteriores
            answerElement.classList.remove('correct', 'incorrect');
            
            // Reseta o evento de clique
            answerElement.onclick = () => handleAnswerClick(optionLetter, answerElement);
        });
        
        // Habilita as respostas
        gameState.answersEnabled = true;
    }

    // Função para lidar com o clique em uma resposta
    function handleAnswerClick(selectedOption, answerElement) {
        if (!gameState.answersEnabled) return;
        
        // Desabilita novas respostas
        gameState.answersEnabled = false;
        
        const currentQuestion = gameState.selectedQuestions[gameState.currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        
        // Atualiza a pontuação
        if (isCorrect) {
            gameState.score += 20;
            answerElement.classList.add('correct');
        } else {
            gameState.score -= 20;
            answerElement.classList.add('incorrect');
            
            // Destaca a resposta correta
            elements.answers.forEach(answer => {
                const option = answer.querySelector('.option').textContent;
                if (option === currentQuestion.correctAnswer) {
                    answer.classList.add('correct');
                }
            });
        }
        
        // Atualiza o display da pontuação
        elements.currentScore.textContent = gameState.score;
        
        // Aguarda um pouco antes de passar para a próxima pergunta
        setTimeout(() => {
            gameState.currentQuestionIndex++;
            
            if (gameState.currentQuestionIndex < gameState.selectedQuestions.length) {
                loadQuestion();
            } else {
                finishQuiz();
            }
        }, 1500);
    }

    // Função para finalizar o quiz
    async function finishQuiz() {
        // Para o cronômetro
        stopTimer();
        
        // Preenche os resultados
        elements.resultName.textContent = gameState.playerName;
        elements.resultScore.textContent = gameState.score;
        elements.resultTime.textContent = elements.timer.textContent;
        
        // Aplica a cor da pontuação
        applyScoreColor(elements.resultScore, gameState.score);
        
        // Salva o resultado no banco de dados
        await dbManager.saveScore(gameState.playerName, gameState.score, gameState.elapsedSeconds);
        
        // Mostra a tela de resultado
        showScreen('result');
    }

    // Função para aplicar a cor da pontuação
    function applyScoreColor(element, score) {
        // Remove classes anteriores
        element.classList.remove('score-negative', 'score-low', 'score-medium', 'score-good', 'score-perfect');
        
        // Aplica a classe apropriada
        if (score < 0) {
            element.classList.add('score-negative'); // Vinho
        } else if (score >= 0 && score <= 24) {
            element.classList.add('score-low'); // Vermelho
        } else if (score >= 25 && score <= 49) {
            element.classList.add('score-medium'); // Laranja
        } else if (score >= 50 && score <= 99) {
            element.classList.add('score-good'); // Roxo
        } else {
            element.classList.add('score-perfect'); // Azul
        }
    }

    // Função para iniciar um novo jogo
    function startNewGame() {
        // Reseta o estado do jogo
        gameState.score = 0;
        gameState.currentQuestionIndex = 0;
        gameState.selectedQuestions = selectRandomQuestions();
        
        // Atualiza a interface
        elements.currentScore.textContent = gameState.score;
        
        // Inicia o cronômetro
        startTimer();
        
        // Carrega a primeira pergunta
        loadQuestion();
        
        // Mostra a tela do quiz
        showScreen('quiz');
    }

    // Função para carregar o ranking
    async function loadRanking() {
        // Obtém os dados do ranking
        const rankingData = await dbManager.getRanking();
        
        // Limpa a tabela
        elements.rankingBody.innerHTML = '';
        
        // Preenche a tabela com os dados
        rankingData.forEach((player, index) => {
            const row = document.createElement('tr');
            
            // Destaca o jogador atual
            if (player.name === gameState.playerName) {
                row.classList.add('highlight');
            }
            
            // Coluna da posição
            const positionCell = document.createElement('td');
            if (index === 0) {
                positionCell.innerHTML = `<span class="crown"><i class="fas fa-crown"></i></span>${index + 1}`;
            } else {
                positionCell.textContent = index + 1;
            }
            
            // Coluna do nome
            const nameCell = document.createElement('td');
            nameCell.textContent = player.name;
            
            // Coluna da pontuação
            const scoreCell = document.createElement('td');
            scoreCell.textContent = player.score;
            applyScoreColor(scoreCell, player.score);
            
            // Coluna do tempo
            const timeCell = document.createElement('td');
            const minutes = Math.floor(player.time / 60);
            const seconds = player.time % 60;
            timeCell.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Adiciona as células à linha
            row.appendChild(positionCell);
            row.appendChild(nameCell);
            row.appendChild(scoreCell);
            row.appendChild(timeCell);
            
            // Adiciona a linha à tabela
            elements.rankingBody.appendChild(row);
        });
        
        // Mostra a tela de ranking
        showScreen('ranking');
    }

    // Event Listeners
    
    // Botão Iniciar na tela inicial
    buttons.start.addEventListener('click', () => {
        showScreen('name');
    });
    
    // Botão Ranking na tela inicial
    buttons.ranking.addEventListener('click', async () => {
        await loadRanking();
    });
    
    // Botão Voltar na tela de nome
    buttons.nameBack.addEventListener('click', () => {
        showScreen('start');
    });
    
    // Botão OK na tela de nome
    buttons.nameSubmit.addEventListener('click', async () => {
        const name = elements.playerName.value.trim();
        
        if (!name) {
            elements.nameError.textContent = 'Por favor, digite seu nome!';
            return;
        }
        
        gameState.playerName = name;
        
        // Verifica se o nome já existe
        const exists = await dbManager.playerExists(name);
        if (exists) {
            showScreen('nameConfirm');
        } else {
            startNewGame();
        }
    });
    
    // Botão Sim na tela de confirmação de nome
    buttons.confirmYes.addEventListener('click', () => {
        startNewGame();
    });
    
    // Botão Não na tela de confirmação de nome
    buttons.confirmNo.addEventListener('click', () => {
        showScreen('name');
        elements.playerName.value = '';
        elements.playerName.focus();
    });
    
    // Botão Menu na tela do quiz
    buttons.menu.addEventListener('click', () => {
        elements.menuPopup.classList.toggle('active');
    });
    
    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', (event) => {
        if (!event.target.closest('#menu-popup') && !event.target.closest('#menu-btn')) {
            elements.menuPopup.classList.remove('active');
        }
    });
    
    // Botão Reiniciar no menu
    buttons.restart.addEventListener('click', () => {
        elements.menuPopup.classList.remove('active');
        startNewGame();
    });
    
    // Botão Sair no menu
    buttons.quit.addEventListener('click', () => {
        elements.menuPopup.classList.remove('active');
        stopTimer();
        showScreen('start');
    });
    
    // Botão OK na tela de resultado
    buttons.resultOk.addEventListener('click', async () => {
        await loadRanking();
    });
    
    // Botão Voltar na tela de ranking
    buttons.rankingBack.addEventListener('click', () => {
        showScreen('start');
    });
    
    // Pressionar Enter na tela de nome
    elements.playerName.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            buttons.nameSubmit.click();
        }
    });
    
    // Limpa a mensagem de erro quando o usuário começa a digitar
    elements.playerName.addEventListener('input', () => {
        elements.nameError.textContent = '';
    });
});
