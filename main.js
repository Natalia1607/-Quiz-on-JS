//All answer options
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

//All options
const optionsElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); // It's question

const numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion,
    indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Петру надо сделать нумерованный список, какой из тегов ему надо использовать:',
        options: [
            'tr',
            'ul',
            'list',
            'ol',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какое свойство используется для задания внутренних отступов у блока?',
        options: [
            'margin',
            'direction',
            'padding',
            'position',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой CSS-код написан правильно?',
        options: [
            '<#div> {border: 1px solid #ccc;}',
            '.div {border: 1px, solid, #fff;}',
            'div {border: 1px solid #000;}',
            '&lt;div&gt; {border: 1px solid #hhh};',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что такое HTML-тег?',
        options: [
            'Cпециальное служебное слово, заключенное в угловые скобки',
            'Язык гипертекстовой разметки',
            'Элементы веб-страниц',
            'Список директорий',
        ],
        rightAnswer: 0
    },
    {
        question: 'Для чего применяется тег &lt;br&gt;?',
        options: [
            'Чтобы активировать прокрутку',
            'Отделять фрагменты текста друг от друга',
            'Для изменения цвета текста',
            'Чтобы задать отступы вокруг текста',
        ],
        rightAnswer: 1
    }
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML  = questions[indexOfQuestion].options[0];
    option2.innerHTML  = questions[indexOfQuestion].options[1];
    option3.innerHTML  = questions[indexOfQuestion].options[2];
    option4.innerHTML  = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};

let completedAnswers = [

]

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

for(option of optionsElements) {
    option.addEventListener('click', e => checkAnswer(e));
}


const disabledOptions = () => {
   optionsElements.forEach(item => {
       item.classList.add('disabled');
       if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
           item.classList.add('correct');
       }
   }) 
};

//Удаление всех классов с ответов

const enableOptions = () => {
    optionsElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
    if(!optionsElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
};

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
