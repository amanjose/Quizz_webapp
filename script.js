let submit = document.getElementById("submit");
let languageSelect = document.getElementById("language");
let inputBox = document.getElementById("code");
let input = document.getElementById("input");
let submitButton = document.getElementById("submit-button");
let question = document.getElementById("question");
let outputArea = document.getElementById("out");

inputBox.focus();

let data = "";
let testIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let id;
let clues = [
  {id: "main entrance"},
  {id: "Well near south quadrangle"},
  {id: "Juice corner"},
  {id: "Greenfield stadium near i love fisat"},
  {id: "Canteen"},
  {id: "Metal bridge near ccf lab"},
  {id: "Passion  fruit near canteen"},
  {id: "Lab entrance"},
  {id: "Fab Lab"},
  {id: "clue10"},
];

localStorage.clear();
localStorage.setItem("1", "1 2 3 4 5 6 7 8 9=29\n");
localStorage.setItem("2", "eeshwarakarunyavannaaamvallabhan=6\n");
localStorage.setItem("3", "20=10944\n");
localStorage.setItem("4", "E F G K=*^6970+7175\n");
localStorage.setItem("5", "Hello minwa=Ecjjm kgluy\n");
localStorage.setItem("6", "6 2 3 1 5 1 4 3=3\n");
localStorage.setItem(
  "7",
  "4 5 2 1 1 1 1 1 1 0 2 1 1 0 1 1 1 1 1 1 1 1=4\n"
);
localStorage.setItem(
  "8",
  "5 1 2 2 3 3 4 4 5=8\n"
);
localStorage.setItem("9", "7 3 1 4 1 5 9 2=6\n");
localStorage.setItem("10", "4=hii\n");

let language = languageSelect.options[languageSelect.selectedIndex].value;

languageSelect.addEventListener("change", () => {
  language = languageSelect.options[languageSelect.selectedIndex].value;
});

submitButton.addEventListener("click", () => {
  data = `${inputBox.value}`;
  let inp = input.value;
  get(data, language, inp);
  input.value = "";
});

let final_out = "";
let inp;
let q_id="";
// q_id = question.innerText
console.log(question.textContent.split(".")[0]);
submit.addEventListener("click", () => {
  data = `${inputBox.value}`;
 q_id = question.textContent.split(".")[0];
    //q_id = "10"
  inp = localStorage.getItem(q_id.trim());
  let ip = inp.split("=")[0];
  let ot = inp.split("=")[1];
  console.log(ip, ot);
  hidden(data, language, ip, ot, q_id.trim());
});

async function get(data, language, inp) {
  let code = Qs.stringify({
    code: data,
    language: language,
    input: inp,
  });
  let config = {
    method: "post",
    url: "https://api.codex.jaagrav.in",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: code,
  };

  axios(config)
    .then(function (response) {
      let json = JSON.stringify(response.data);
      console.log(json);
      outputArea.innerText = JSON.parse(json).output;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function failed(msg, color) {
  Swal.fire({
    title: msg,
    background: "#19191a",
    color: color,
    showCancelButton: true,
  });
}

async function hidden(data, language, ip, op, q_id) {
  console.log(ip, op);
  let code = Qs.stringify({
    code: data,
    language: language,
    input: ip,
  });
  let config = {
    method: "post",
    url: "https://api.codex.jaagrav.in",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: code,
  };

  axios(config)
    .then(function (response) {
      let json = JSON.stringify(response.data);
      // console.log(json)
      let out = JSON.parse(json).output;

      //   let t1 = localStorage.getItem(ip);
      let green = "green";
      let red = "red";
         q_id = parseInt(q_id)
          console.log(q_id,clues[q_id-1].id)
         let message = clues[q_id-1].id;
      if (language == "c") {
        final_out = op.split("\n")[0];
        if (final_out == out) {
            // q_id = parseInt(q_id)
            console.log(clues.q_id)
          failed(message, green);
        } else {
          failed("testcase failed", red);
        }
      } else {
        console.log(op,out)
        if (op == out) {
        
          failed(message, green);
        } else {
          failed("testcase failed", red);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
