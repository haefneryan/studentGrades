const url = 'https://api.hatchways.io/assessment/students';
const searchBar = document.getElementById('searchBar');
const tagFilterSearchBar = document.getElementById('tagSearchBar');
let tagSearchBar = [];
let tagSearchBarString;
let data = [];
let studentsArray = [];
let x;
let dataLoaded = false;
let tagsArray = new Array;
let tagsStorageArrayLengths = new Array;
let searchBarString = '';
let tagFilterSearchBarString = '';
getData();

searchBar.addEventListener('keyup', function(event) {
    if (tagFilterSearchBarString.length == 0) {
        searchBarString = event.target.value.toLowerCase();
        for (let j=0; j<x; j++) {
            data.students[j].firstName = data.students[j].firstName.toLowerCase();
            data.students[j].lastName = data.students[j].lastName.toLowerCase();
            if (searchBarString.length == 0) {
                document.getElementById('container_' + j).style.display = 'block';
            }
            if (data.students[j].firstName.includes(searchBarString) || data.students[j].lastName.includes(searchBarString)) {
                document.getElementById('container_' + j).style.display = 'block';
            } else {
                document.getElementById('container_' + j).style.display = 'none';
            }
        }
    }
});

tagFilterSearchBar.addEventListener('keyup', function(event) {
    tagFilterSearchBarString = event.target.value.toLowerCase();
    if (searchBarString.length > 0 && tagFilterSearchBarString.length > 0) {
        for (let j=0; j<x; j++) {
            if (document.getElementById('tags_' + j).firstChild) {
                for (let s=0; s<tagsStorageArrayLengths[j]; s++) {
                    if (!document.getElementById('tags_' + j).children.item(s).innerHTML.includes(tagFilterSearchBarString)) {
                        document.getElementById('container_' + j).style.display = 'none';
                    }  
                }
            } else {
                document.getElementById('container_' + j).style.display = 'none';
            }
        }
    }
});

tagFilterSearchBar.addEventListener('keyup', function(event) {
    if (searchBarString.length == 0) {
        tagFilterSearchBarString = event.target.value.toLowerCase();
        for (let j=0; j<x; j++) {
            if (tagFilterSearchBarString.length == 0) {
            } else if (document.getElementById('tags_' + j).firstChild) {
                for (let s=0; s<tagsStorageArrayLengths[j]; s++) {
                    if (document.getElementById('tags_' + j).children.item(s).innerHTML.includes(tagFilterSearchBarString)) {
                        document.getElementById('container_' + j).style.display = 'block';
                        break;
                    } else {
                        document.getElementById('container_' + j).style.display = 'none';
                    }
                }
            } else {
                document.getElementById('container_' + j).style.display = 'none';
            }
        }
    }
});

searchBar.addEventListener('keyup', function(event) {
    searchBarString = event.target.value.toLowerCase();
    if (searchBarString.length > 0 && tagFilterSearchBarString.length > 0) {
        for (let j=0; j<x; j++) {
            data.students[j].firstName = data.students[j].firstName.toLowerCase();
            data.students[j].lastName = data.students[j].lastName.toLowerCase();
            if (!data.students[j].firstName.includes(searchBarString) || data.students[j].lastName.includes(searchBarString)) {
                document.getElementById('container_' + j).style.display = 'none';
            }
        }
    }
});

async function getData() {
    const response = await fetch(url);
    data = await response.json();
    x = data.students.length;
    let z = data.students[0].grades.length;

    for (let j=0; j<x; j++) {
        for (let k=0; k<z; k++) {
            data.students[j].grades[k] = parseInt(data.students[j].grades[k]);
        }
    }

    for (let i=0; i<x; i++) {
        let studentGradeTotal = 0;
        let studentGradeAvg = 0;
        for (let y=0; y<data.students[i].grades.length; y++) {
            studentGradeTotal = studentGradeTotal + data.students[i].grades[y];
        }
        studentGradeAvg = studentGradeTotal/(data.students[i].grades.length);

        document.getElementById('students').innerHTML += '<div class="container" id="container_' + i + '"><div id=student_' + i +' class="student"><img src=' + data.students[i].pic + '><div class="name">' + data.students[i].firstName.toUpperCase() + ' ' + data.students[i].lastName.toUpperCase() + '</div><div class="info"><p>Email: ' + data.students[i].email + '</p><p>Company: ' + data.students[i].company + '</p><p>Skill: ' + data.students[i].skill + '</p><p>Average: ' + studentGradeAvg + '%</p><div id="inputContainer"></div></div><button id="button_' + i + '" class="button expandable" onclick="expandable(event); plusMinus(event)" value=' + i + '></button></div><div id=studentGrades_' + i + ' class="grades"></div><div id="tags_' + i + '" class="tags" value="' + p + '"></div><input type="text" name="' + i + '" id="newTag_' + i + '" class="tagInput" placeholder="Add a tag"><button id="clearTags_' + i + '" value="' + i + '"onclick="clearTags(event)" class="clearTags">Clear tags</button></div>';
    }

    for (let i=0; i<x; i++) {
        for (let k=0; k<z; k++) {
            document.getElementById('studentGrades_' + i).innerHTML += '<p>Test ' + (k+1) + ': ' + data.students[i].grades[k] + '%</p>';
        }
    }
    dataLoaded = true;
}

function expandable() {
    var z = event.target.value;
    document.getElementById('student_' + z).classList.toggle('active');

    if (document.getElementById('studentGrades_' + z).style.display == 'block') {
        document.getElementById('studentGrades_' + z).style.display = 'none';
    } 
    else {
        document.getElementById('studentGrades_' + z).style.display = 'block';
    }
}

window.addEventListener('keyup', function(e) {
    if (dataLoaded == true) {
        for (let i=0; i<25; i++) {
            tagsArray[i] = document.getElementById('newTag_' + i).value;
            tagSearchBarString = document.getElementById('newTag_' + i).value;
            if (e.key === 'Enter' && tagSearchBarString.length > 0) {
                document.getElementById('newTag_' + i).previousSibling.innerHTML += '<div class="tag">' + tagsArray[i] + '</div>';
                document.getElementById('newTag_' + i).value = '';
                tagsStorageArrayLengths[i] = document.getElementById('tags_' + i).getElementsByTagName('div').length;
            }
        }
    }
})

function clearTags(event) {
    tagsArray = [];
    for (let j=0; j<x; j++) {
        if (document.getElementById('clearTags_' + j).value == event.target.value) {
            document.getElementById('clearTags_' + j).previousSibling.previousSibling.innerHTML = '';
        }
    }
}

function plusMinus() {
    for (let j=0; j<x; j++) {
        if (document.getElementById('button_' + j).value == event.target.value) {
            if (document.getElementById('button_' + j).style.getPropertyValue('--buttonColor') == 'grey') {
                document.getElementById('button_' + j).style.setProperty('--buttonColor', 'lightgrey')
                document.getElementById('button_' + j).style.setProperty('--minus', 'block')
            } else {
                document.getElementById('button_' + j).style.setProperty('--buttonColor', 'grey')
                document.getElementById('button_' + j).style.setProperty('--minus', 'none')
            }
        }
    }
}
