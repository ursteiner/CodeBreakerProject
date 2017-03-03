let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
  let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value == '' || attempt.value == ''){
      setHiddenFields();
    }

    if(validateInput(input.value)){
      num = Number(attempt.value) + 1;
      attempt.value = num;
    }else{
      return false;
    }

    if(getResults(input.value)){
      setMessage("You Win! :)");
      showAnswer(true);
      showReplay();
    }else if(attempt.value >= 10){
      setMessage("You Lose! :(");
      showAnswer(false);
      showReplay();
    }else{
      setMessage("Incorrect, try again.");
    }
}

function setHiddenFields(){
  number = Math.floor(Math.random(9999) * 10000);
  strAnswer = number.toString();
  while(strAnswer.toString().length < 4){
    strAnswer = '0' + strAnswer;
  }

  answer.value = strAnswer;
  attempt.value = 0;
}

//implement new functions here
function setMessage(text){
    document.getElementById('message').innerHTML = text;
}

function validateInput(input){
  if(input.length == 4){
    return true;
  }else{
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
  }
}

function getResults(input){
  let results = document.getElementById('results');
  let resultHtml = results.innerHTML;
  resultHtml += '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
  let correct = 0;

  for(var i=0; i<input.length; i++){
    if(input[i] == answer.value[i]){
        resultHtml += '<span class="glyphicon glyphicon-ok"></span>';
        correct++;
    }else if(answer.value.includes(input[i])){
        resultHtml += '<span class="glyphicon glyphicon-transfer"></span>';
    }else if (!answer.value.includes(input[i])){
        resultHtml += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  resultHtml += '</div></div>';
  results.innerHTML = resultHtml;

  if(correct == 4){
    return true;
  }
  return false;
}

function showAnswer(won){
  let code = document.getElementById('code');
  code.innerHTML = answer.value;
  if(won){
    code.className = ' success';
  }else{
    code.className = ' failure';
  }
}

function showReplay(){
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}
