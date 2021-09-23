let score = 0;
let index = 0;
const num = 0;
const quizArr = [
    {
        question: "What is Capital of China",
        option1: "Guandong",
        option2: "Beijing",
        option3: "Shenzhen",
        option4: "Shanghai",
        answer: "Beijing",
    },
    {
        question: "What is Capital of Russia",
        option1: "St. Petersburg",
        option2: "Kiev",
        option3: "Moscow",
        option4: "Sochi",
        answer: "Moscow",
    },
    {
        question: "What is Capital of India",
        option1: "New Delhi",
        option2: "Jaipur",
        option3: "Mumbai",
        option4: "Chennai",
        answer: "New Delhi",
    },
];
const maxScore = quizArr.length;

// function to remove all child node of an HTML parent element
function removeAllChildNodes(parentName) {
    const parent = document.querySelector(parentName);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function importQuestions() {
    // getting the name of the user
    var name = document.querySelector("#name").value;

    // Removing the previous HTML elements
    removeAllChildNodes(".main");

    // Creating the Question Elements dynamically
    const question = document.createElement("h1");
    document.querySelector(".main").appendChild(question);
    document.querySelector("h1").setAttribute("id", "question");

    // Creating the Options Elements dynamically
    for (let i = 1; i < 5; i++) {
        // Adding main-question class to the main div
        document
            .querySelector("div")
            .setAttribute("class", "main main-question");

        // Creating the div element
        const div = document.createElement("div");
        div.setAttribute("class", "group");

        // Creating the output area where answer is correct or not will be outputed
        const h4 = document.createElement("h4");
        h4.setAttribute("id", `output${i}`);
        div.appendChild(h4);

        // Creating the Option button
        const button = document.createElement("button");
        button.setAttribute("type", `button${i}`);
        button.setAttribute("id", `option${i}`);
        button.setAttribute("onclick", `checkAnswer(${i})`);
        div.appendChild(button);

        // Appending the horizontal break
        div.appendChild(document.createElement("br"));

        //Append the div to the main div
        document.querySelector(".main").appendChild(div);
    }

    displayElements();
}

function displayElements() {
    // Displaying the questionsy
    document.getElementById("question").innerHTML = quizArr[index].question;

    for (let i = 1; i < 5; i++) {
        // Displaying the options
        document.getElementById(`option${i}`).innerHTML =
            quizArr[index][`option${i}`];

        // Enabling all the disabled options
        document.getElementById(`option${i}`).disabled = false;

        // Removing previously appended texts
        document.getElementById(`output${i}`).innerHTML = "";
    }
}

function checkAnswer(num) {
    // Initializing the variables
    const option = `option${num}`;
    const output = `output${num}`;

    // Disabling all the other options so that the user cannot answer same question twice
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`option${i}`).disabled = true;
    }

    // Check if the option is correct
    if (quizArr[index][option] == quizArr[index].answer) {
        // Incrementing the score & the index for next question
        score++;
        index++;

        // Adding the tick symbol as the answer is right
        document.getElementById(output).innerHTML = "&#10003;";
        document.getElementById(option).style.animation =
            "correct 1.5s ease-out";

        // Displaying next question
        if (index < quizArr.length) {
            setTimeout(displayElements, 1500);
        } else {
            // As all questions are ended displaying the score card.
            setTimeout(() => {
                removeAllChildNodes(".main");
                createScoreCard();
            }, 1500);
        }
    } else {
        // Incrementing the index for next question
        index++;

        // Adding the cross symbol as the answer is wrong
        document.getElementById(output).innerHTML = "&#10007;";
        document.getElementById(option).style.animation =
            "incorrect 1.5s ease-out";

        // Displaying next question
        setTimeout(() => {
            if (index == quizArr.length) {
                removeAllChildNodes(".main");
                createScoreCard();
            } else {
                displayElements();
            }
        }, 1500);
    }
}

function createScoreCard() {
    const div = document.querySelector(".main");
    div.removeAttribute("class");
    div.setAttribute("class", "main");

    // Creating elements, adding attributes and writing content
    div.innerHTML = `
    <h1 id="title">Your Score</h1>
    
    <p id="score">
        <span style='color:rgb(112, 255, 160)'>
            ${score} / ${maxScore} 
            <p style="font-size: 1.5rem; font-align: center;">
                Correct
            </p>
        </span>
    </p>
    
    <p id="description">${getParagraph()}</p>`;
}

function getParagraph() {
    const percent = (score * 100) / 2;
    if (maxScore - score == 0) {
        return "You passed! Congrats! You know enough about geography to have gotten a 100% Score.";
    } else if (maxScore - score == 1) {
        return "You passed! Congrats! You know enough about geography to have gotten a passing grade here. You should have gotten 100%, but maybe you mis-clicked somewhere.";
    } else if (percent < 0.4) {
        return "You failed, These were the easiest geography questions, but you still only managed just below a 40% score. I'll just assume you're having an off day.";
    } else {
        return "Good, You Passed You have scored more than 40%.";
    }
}
