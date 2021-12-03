function generate(flag) {
    if(flag == 0){
        var sectionTag = document.getElementById('outputContainer');
        sectionTag.style.display = 'none';
    }

    var rawQuestionContents = new Map();
    var rawQuestionFilepaths = [6];
    rawQuestionFilepaths[0] = '/4000Questions/questions/01 The Latest Scoop.txt';
    rawQuestionFilepaths[1] = '/4000Questions/questions/02 Childhood and School.txt';
    rawQuestionFilepaths[2] = '/4000Questions/questions/03 Family and Friends.txt';
    rawQuestionFilepaths[3] = '/4000Questions/questions/04 Fun and Sport.txt';
    rawQuestionFilepaths[4] = '/4000Questions/questions/05 Habits.txt';
    rawQuestionFilepaths[5] = '/4000Questions/questions/06 Love and Sex.txt';
    rawQuestionFilepaths[6] = '/4000Questions/questions/07 Outlook.txt';
    rawQuestionFilepaths[7] = '/4000Questions/questions/08 Politics.txt';
    rawQuestionFilepaths[8] = '/4000Questions/questions/09 Spirituality.txt';
    rawQuestionFilepaths[9] = '/4000Questions/questions/10 Work.txt';

    var filesLoaded = 0;
    for(var i=0; i<rawQuestionFilepaths.length; i++){
        fetch(rawQuestionFilepaths[i]).then( r => r.text()).then(function(text){
            var key = 'null';
            if(text.startsWith('**01')){
                key = '01';
            } else if(text.startsWith('**02')){
                key = '02';
            } else if(text.startsWith('**03')){
                key = '03';
            } else if(text.startsWith('**04')){
                key = '04';
            } else if(text.startsWith('**05')){
                key = '05';
            } else if(text.startsWith('**06')){
                key = '06';
            } else if(text.startsWith('**07')){
                key = '07';
            } else if(text.startsWith('**08')){
                key = '08';
            } else if(text.startsWith('**09')){
                key = '09';
            } else if(text.startsWith('**10')){
                key = '10';
            }
            rawQuestionContents.set(key,text);
            filesLoaded++;
            if(filesLoaded == rawQuestionFilepaths.length){
                return generateQuestions(rawQuestionContents,flag);
            }
        });
    }

}
function generateQuestions(rawQuestionContents,flag){
    var numberOfQuestions = 0;
    if(flag > 0){
        numberOfQuestions = flag;
    } else {
        numberOfQuestions = document.getElementById('numberOfQuestions').value
    }

    var masterQuestionText = '';
    if(document.getElementById("check1").checked){
        masterQuestionText = masterQuestionText + rawQuestionContents.get('01');
    }
    if(document.getElementById("check2").checked){
        masterQuestionText = masterQuestionText + rawQuestionContents.get('02');
    }
    if(document.getElementById("check3").checked){
        masterQuestionText = masterQuestionText + rawQuestionContents.get('03');
    }
    if(document.getElementById("check4").checked){
        masterQuestionText = masterQuestionText + rawQuestionContents.get('04');
    }
    if(document.getElementById("check5").checked){
        masterQuestionText = masterQuestionText + rawQuestionContents.get('05');
    }
    if(document.getElementById("check6").checked){
        masterQuestionText = masterQuestionText + rawQuestionContents.get('06');
    }
    if(document.getElementById("check7").checked){
        masterQuestionText = masterQuestionText + rawQuestionContents.get('07');
    }
    if(document.getElementById("check8").checked){
        masterQuestionText = masterQuestionText + rawQuestionContents.get('08');
    }
    if(document.getElementById("check9").checked){
        masterQuestionText = masterQuestionText + rawQuestionContents.get('09');
    }
    if(document.getElementById("check10").checked){
        masterQuestionText = masterQuestionText + rawQuestionContents.get('10');
    }
    var masterQuestionArr = masterQuestionText.split('\n');

    var output = '';
    for(var i=0; i<numberOfQuestions; i++){
        output = (i > 0) ? output + '\n' : output;

        var question = masterQuestionArr[getRandomInt(masterQuestionArr.length)].trim();
        while(question.startsWith('**')){
            question = masterQuestionArr[getRandomInt(masterQuestionArr.length)].trim();
        }

        output = output + question;
    }

    var codeTag = document.getElementById('textOutput');
    codeTag.innerHTML = output;
    var sectionTag = document.getElementById('outputContainer');
    sectionTag.style.display = 'block';

    return output;
}

function getRandomInt(max) {
    var rand = Math.floor(Math.random() * Math.floor(max));
    if(rand == 0){
        return rand + 1;
    }
    return rand;
}

function randBool(){
    var randInt = Math.floor(Math.random() * Math.floor(2));
    return randInt == 1;
}

function toggle(source) {
    checkboxes = document.getElementsByName('sectionCheckbox');
    for(var i=0, n=checkboxes.length;i<n;i++) {
      checkboxes[i].checked = source.checked;
    }
}