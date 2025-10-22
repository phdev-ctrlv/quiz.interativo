// --- Elementos do DOM ---
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const usernameInput = document.getElementById('username');
const startButton = document.getElementById('start-button');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');

const resultUsername = document.getElementById('result-username');
const correctAnswersSpan = document.getElementById('correct-answers');
const wrongAnswersSpan = document.getElementById('wrong-answers');
const scorePercentageSpan = document.getElementById('score-percentage');
const performanceMessage = document.getElementById('performance-message');
const performanceChartCanvas = document.getElementById('performance-chart');

// --- Variáveis do Jogo ---
let perguntaAtualIndex = 0;
let pontuacao = 0;
let nomeUsuario = '';
let meuGrafico = null; 

// --- Questões (Tema: HTML, CSS e JavaScript para iniciantes) ---
const questions = [
    {
        question: "O que a sigla HTML significa?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Modern Language", correct: false },
            { text: "Hyperlink and Text Management Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Qual tag HTML é usada para criar um parágrafo?",
        answers: [
            { text: "<br>", correct: false },
            { text: "<p>", correct: true },
            { text: "<hr>", correct: false },
            { text: "<h1_>", correct: false }
        ]
    },
    {
        question: "Qual tag é usada para criar o título principal de uma página?",
        answers: [
            { text: "<p>", correct: false },
            { text: "<title>", correct: false },
            { text: "<h6>", correct: false },
            { text: "<h1>", correct: true }
        ]
    },
    {
        question: "Como se cria um link em HTML?",
        answers: [
            { text: "<link href='...'>", correct: false },
            { text: "<a href='...'>", correct: true },
            { text: "<href...>", correct: false },
            { text: "<p link='...'>", correct: false }
        ]
    },
    {
        question: "Qual tag é usada para inserir uma imagem?",
        answers: [
            { text: "<imagem>", correct: false },
            { text: "<pic>", correct: false },
            { text: "<img src='...'>", correct: true },
            { text: "<image source='...'>", correct: false }
        ]
    },
    {
        question: "O que a sigla CSS significa?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Creative Style System", correct: false },
            { text: "Computer Style Syntax", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "Qual propriedade CSS altera a cor do texto de um elemento?",
        answers: [
            { text: "font-color", correct: false },
            { text: "text-color", correct: false },
            { text: "background-color", correct: false },
            { text: "color", correct: true }
        ]
    },
    {
        question: "Como selecionamos um elemento com o id 'titulo' em CSS?",
        answers: [
            { text: ".titulo", correct: false },
            { text: "*titulo", correct: false },
            { text: "#titulo", correct: true },
            { text: "titulo", correct: false }
        ]
    },
    {
        question: "Qual propriedade CSS é usada para criar um espaçamento interno em um elemento?",
        answers: [
            { text: "margin", correct: false },
            { text: "padding", correct: true },
            { text: "border", correct: false },
            { text: "spacing", correct: false }
        ]
    },
    {
        question: "Qual é a forma correta de linkar um arquivo CSS chamado 'estilo.css'?",
        answers: [
            { text: "<style src='estilo.css'>", correct: false },
            { text: "<link rel='stylesheet' href='estilo.css'>", correct: true },
            { text: "<css href='estilo.css'>", correct: false },
            { text: "<script src='estilo.css'>", correct: false }
        ]
    },
    {
        question: "Dentro de qual tag HTML colocamos o código JavaScript?",
        answers: [
            { text: "<js>", correct: false },
            { text: "<javascript>", correct: false },
            { text: "<script>", correct: true },
            { text: "<code>", correct: false }
        ]
    },
    {
        question: "Como se declara uma variável em JavaScript?",
        answers: [
            { text: "var, let ou const", correct: true },
            { text: "variable", correct: false },
            { text: "v", correct: false },
            { text: "dim", correct: false }
        ]
    },
    {
        question: "Como se escreve um comentário de uma linha em JavaScript?",
        answers: [
            { text: "//coment", correct: false },
            { text: "/* comentário */", correct: false },
            { text: "** comentário **", correct: false },
            { text: "// comentário", correct: true }
        ]
    },
    {
        question: "Qual o resultado de '5' + 5 em JavaScript?",
        answers: [
            { text: "10", correct: false },
            { text: "55", correct: true },
            { text: "Erro", correct: false },
            { text: "undefined", correct: false }
        ]
    },
    {
        question: "Qual função é usada para exibir algo no console do navegador?",
        answers: [
            { text: "console.print()", correct: false },
            { text: "print.log()", correct: false },
            { text: "console.log()", correct: true },
            { text: "document.write()", correct: false }
        ]
    }
];

// --- Funções do Jogo ---

function comecarQuiz() {
    nomeUsuario = usernameInput.value;
    if (nomeUsuario.trim() === '') {
        alert('Por favor, insira seu nome!');
        return;
    }
    pontuacao = 0;
    perguntaAtualIndex = 0;
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    mostrarProximaPergunta();
}

function mostrarProximaPergunta() {
    limparPerguntaAnterior();
    const pergunta = questions[perguntaAtualIndex];
    questionText.innerText = pergunta.question;

    pergunta.answers.forEach(resposta => {
        const button = document.createElement('button');
        button.innerText = resposta.text;
        button.classList.add('btn');
        if (resposta.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selecionarResposta);
        answerButtons.appendChild(button);
    });
}

function limparPerguntaAnterior() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.classList.add('hide');
}

function selecionarResposta(e) {
    const botaoClicado = e.target;
    if (botaoClicado.dataset.correct) {
        pontuacao++;
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct) {
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
        button.disabled = true;
    });

    nextButton.classList.remove('hide');
}

function irParaProxima() {
    perguntaAtualIndex++;
    if (perguntaAtualIndex < questions.length) {
        mostrarProximaPergunta();
    } else {
        mostrarResultados();
    }
}

function mostrarResultados() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    const erros = questions.length - pontuacao;
    const percentual = Math.round((pontuacao / questions.length) * 100);

    resultUsername.innerText = `Resultados de ${nomeUsuario}:`;
    correctAnswersSpan.innerText = pontuacao;
    wrongAnswersSpan.innerText = erros;
    scorePercentageSpan.innerText = percentual;

    let mensagem = '';
    if (percentual >= 80) {
        mensagem = 'Excelente!';
    } else if (percentual >= 50) {
        mensagem = 'Bom desempenho';
    } else {
        mensagem = 'Precisa melhorar';
    }
    performanceMessage.innerText = mensagem;

    criarGrafico(pontuacao, erros);
}

function criarGrafico(acertos, erros) {
    if (meuGrafico) {
        meuGrafico.destroy();
    }
    const context = performanceChartCanvas.getContext('2d');
    meuGrafico = new Chart(context, {
        type: 'pie',
        data: {
            labels: ['Acertos', 'Erros'],
            datasets: [{
                data: [acertos, erros],
                backgroundColor: ['#28a745', '#dc3545'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: 'Gráfico de Desempenho' } }
        }
    });
}

function reiniciarQuiz() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    usernameInput.value = '';
}

// --- Event Listeners ---
startButton.addEventListener('click', comecarQuiz);
nextButton.addEventListener('click', irParaProxima);

restartButton.addEventListener('click', reiniciarQuiz);
