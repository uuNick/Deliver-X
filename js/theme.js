var checkBox_1 = document.querySelector(".switch");
var checkBox_2 = document.querySelector(".switch_2");

checkBox_1.addEventListener("change", function(){
    if (localStorage.getItem('theme') === 'dark') {
        localStorage.removeItem('theme');
    }
    else{
        localStorage.setItem('theme', 'dark');
    }
    addDarkClassToHTML();
});

checkBox_2.addEventListener("change", function(){
    if (localStorage.getItem('theme') === 'dark') {
        localStorage.removeItem('theme');
    }
    else{
        localStorage.setItem('theme', 'dark');
    }
    addDarkClassToHTML();
});

function addDarkClassToHTML(){
    try {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            document.querySelector(".switch input").checked = true;
            document.querySelector(".switch_2 input").checked = true;
            
        }
        else{
            document.documentElement.classList.remove('dark');
            document.querySelector(".switch input").checked = false;
            document.querySelector(".switch_2 input").checked = false;
        }
    } catch (err) { }
    
}

addDarkClassToHTML();