const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Less than 18.5",
      info: "Underweight",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Between 18.5 and 24.9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Between 25.0 and 29.9",
      info: "Overweight",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Between 30.0 and 39.9",
      info: "Obesity",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Greater than 40.0",
      info: "Severe obesity",
      obesity: "III",
    },
];

const bmiTable = document.querySelector("#bmi-table");

const heightInput = document.querySelector("#height");

const weightInput = document.querySelector("#weight");

const calcBtn = document.querySelector("#calc-btn");

const clearBtn = document.querySelector("#clear-btn");

const bmiNumber = document.querySelector("#bmi-number span");

const bmiInfo = document.querySelector("#bmi-info");

const backBtn = document.querySelector("#back-btn");

const opContainer = document.querySelector("#operation-container");

const resultContainer = document.querySelector("#result-container");

function createTable(data) {
    data.forEach(item => {
        
        const div = document.createElement("div");
        div.classList.add("table-data");

        const classification = document.createElement("p")
        classification.innerText = item.classification

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p")
        obesity.innerText = item.obesity;

        div.appendChild(classification)
        div.appendChild(info)
        div.appendChild(obesity)

        bmiTable.appendChild(div);
    });
}

function clearInputs(){
    heightInput.value = "";
    weightInput.value = "";
    bmiInfo.classList = "";
    bmiNumber.classList = "";
}

function validDigits(text){
    return text.replace(/[^0-9^,]/g, ""); 
}

function showOrHideResults() {
    opContainer.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
};

[heightInput, weightInput].forEach((el)=> {
    el.addEventListener("input", (e) => {
        const updatedValue = validDigits(e.target.value);
        e.target.value = updatedValue;
    })
});

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const weight = +weightInput.value.replace(",", ".")
    const height = +heightInput.value.replace(",", ".")

    if (!weight || !height) return;
    
    const bmi = calcBmi(weight, height);

    let info;

    data.forEach((item) => {
        if (bmi >= item.min && bmi <= item.max) {
            info = item.info;
        }
    });

    if (!info) return;

    bmiNumber.innerHTML = bmi;
    bmiInfo.innerHTML = info;

    showOrHideResults();

    switch (info) {
        case "Underweight":
            bmiNumber.classList.add("low")
            bmiInfo.classList.add("low")
            break;
        
        case "Overweight":
                bmiNumber.classList.add("low")
                bmiInfo.classList.add("low")
                break;

        case "Normal":
            bmiNumber.classList.add("good")
            bmiInfo.classList.add("good")
            break;

        case "Obesity":
                bmiNumber.classList.add("medium")
                bmiInfo.classList.add("medium")
                break; 

        case "Severe Obesity":
            bmiNumber.classList.add("high")
            bmiInfo.classList.add("high")
            break;   
    }
});

function calcBmi (weight, height) {
    const bmi = (weight / (height * height)).toFixed(1);

    return bmi;
}

createTable(data);

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearInputs();
})

backBtn.addEventListener("click", () => {
    clearInputs();
    showOrHideResults();
})