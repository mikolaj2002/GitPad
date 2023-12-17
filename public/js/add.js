import {send}  from "./post.js";

var editor = new MediumEditor('.editable', {
    buttonLabels: 'fontawesome',
    toolbar: {
        /* These are the default options for the toolbar,
        if nothing is passed this is what is used */
        allowMultiParagraphSelection: true,
        buttons: ['bold', 'italic', 'underline', 'h2', 'h3'],
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        relativeContainer: null,
        standardizeSelectionStart: false,
        static: false,
        /* options which only apply when static is true */
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false
    }
}),

cssLink = document.getElementById('medium-editor-theme');


const page = {
    titleField: document.getElementById('titleField'),
    textField: document.getElementById('textField'),
    titleInput: document.getElementById('novelInput'),
    chapterInput: document.getElementById('chapterInput'),
}

var novelId;
var chapters; // tablica

document.getElementById('novelInput').addEventListener('input', function () {

    let text = this.value;
    let data = {
        substring: text
    }
    send('/novelsByTitle',data,(res) => {
        const novels = res;
        
        this.list.innerHTML='<option>Nowe Opowiadanie</option>';
        const chapterInput = document.getElementById('chapterInput');
        chapterInput.list.innerHTML = '';
        
        chapterInput.value = "";
        novelId = 1;
        
        chapters = [{id:-1,title:"Nowy rozdział",newTitle:"",text:"",newText:""}]
        if(this.value == "Nowe Opowiadanie"){
            chapterInput.list.innerHTML = '<option>Nowy rozdział</option>';
        }else 
        novels.forEach(novel => {
            if(novel.title == this.value){
                novelId = novel.id;
                send('/chaptersOfNovel',{id:novelId}, (res) =>{
                    
                    res.forEach(chap => {
                        chapters.push({
                            id: chap.id,
                            title:chap.title,
                            newTitle:chap.title,
                            text: "",
                            newText: ""
                        })
                    })

                    chapters.forEach(chapter => {
                        var option = document.createElement('option');
                        option.value = chapter.title;
                        chapterInput.list.appendChild(option);
                    })
                })  
                
            }
            var option = document.createElement('option');
            option.value = novel.title;
            this.list.appendChild(option);
        })
    })
});

document.getElementById('chapterInput').addEventListener('input', function () {
    chapters.forEach( (entry, index) => {
        if( this.value == entry.title ){
            if(entry.text != "" || index == 0){
                page.textField.innerHTML = entry.newText;
                page.titleField.value = entry.newTitle;
            }else{
                send('/getChapterContent',{id:entry.id,novelId:novelId},(res) => {
                    entry.text = res.text;
                    entry.newText = res.text;
                    document.getElementById("textField").innerHTML = res.text;
                    page.titleField.value = entry.newTitle;
                });
            }
        }
    });
    
});



document.getElementById('resetChapter').addEventListener('click', function () {
    const input = document.getElementById('chapterInput');
    chapters.forEach( entry => {
        if( input.value == entry.title ){
            entry.newText = entry.text;
            entry.newTitle = entry.title;
            page.textField.innerHTML = entry.text;
            page.titleField.value = entry.title;
        }
    });
});

page.textField.addEventListener('input', function () {
    chapters.forEach( entry => {
        if( page.chapterInput.value == entry.title ){
            entry.newText = this.innerHTML;
        }
    });
});
page.titleField.addEventListener('input', function () {
    chapters.forEach( entry => {
        if( page.chapterInput.value == entry.title ){
            entry.newTitle = this.value;
        }
    });
});

document.getElementById('publish').addEventListener('click', function () {
    const payload = {
        userId: document.getElementById("userField").value, // TUTAJ DODAĆ USER ID
        parentId: novelId,
        chapters: chapters.map((chapter) => {
            return {
                id: chapter.id,
                title:chapter.newTitle,
                text: chapter.newText
            }
        })
    }
    send('/publishNovel',payload,(res)=>{
        
        console.log(res.error);   
        if(res.error == true)
            alert(res.message);
        else{
            alert("Opowieść opublikowana");
            location.reload();
        }
    });

    // send('/userStats',{id:payload.userId}, (res)=>{
    //     console.log(res);
    // })

    // send('/novelStats',{id:novelId}, (res)=>{
    //     console.log(res);
    // })
    
});