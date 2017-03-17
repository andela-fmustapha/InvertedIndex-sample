class InvertedIndex{
    
    constructor(){
        this.indices={};
        this.answer={};
        this.fileContent={};
        this.splitedWords={}
    }

    readFile(aFiles){
        console.log(aFiles, "aFiles");
        aFiles.forEach((file) => {
            // console.log(file, "file one");
            readEachfile(file);
        });

  }


    

    validateFile(jsonContent){
        jsonContent.forEach((doc)=>{
            if(doc.hasOwnProperty("title") && doc.hasOwnProperty("text"))
            {
                console.log(doc.title);
            }
            else
            console.log(true);
        })
    }
     
     tokenizeWords(book1){

        //if a document exists? combine title and text to split at once
    }
        createIndex(fileContent){
            let book1 = JSON.parse(fileContent);
            //tokenize words
          let titlePlusText = {};
        book1.forEach((bookContent, bookIndex) => {
          if(book1.hasOwnProperty(bookIndex)){
            titlePlusText[bookIndex] = bookContent.title +' '+ bookContent.text;
            // titlePlusText[bookIndex] = `${bookContent.title}${bookContent.text}`;
            //Remove punctuations and unwanted characters
            titlePlusText[bookIndex]=titlePlusText[bookIndex].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
          }  
        });
        console.log(titlePlusText);
  
        //split words in each document
        let splitedWords={}
        for (let doc in titlePlusText){
          splitedWords[doc]= titlePlusText[doc].toLowerCase().split(' ').sort(); //make words lower case, split them and sort them
          //filter to get unique words...word for each word/item, index for word's index and a for each array.
          splitedWords[doc]= splitedWords[doc].filter((word, index, splitedWords) => splitedWords.indexOf(word) == index); 
        }
    

       //index words 
        let answer= {};
        Object.keys(splitedWords).forEach((keys) => { 
            splitedWords[keys].forEach((words) => {
                if (!answer.hasOwnProperty(words)) {
                answer[words] = [keys];
                } 
                else 
                answer[words].push(keys);
        });
       });
       
       return answer;
       }
    
    getIndex(fileName){
       
    }
    searchIndex(searchWords, fileName){
      //let = this; 
    //    if (this.tokenizeWords(searchWords));
    //    check to see if words exist in 
    //    if a word/ words exist then display 
    //    let searchResult=this.getIndex(searchWords);

    }

}


const sample = new InvertedIndex();
let allFiles = [];
const fileInput = document.getElementById('fUpload');

fileInput.addEventListener('change', ()=> { 
    //get files and validate extension
    allFiles = [];
    Object.keys(fileInput.files).forEach((file) => {
        const eachFile = fileInput.files[file];
        if (validateExt(eachFile.name)) {  //validate eachfile extention and push good files into allFiles 
            allFiles.push(eachFile);
        } else {
            console.log('not valid')
        }
    });
       
});

const readFile = () => {
    sample.readFile(allFiles);
}

const readEachfile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
           let result =event.target.result;
            console.log(sample.createIndex(result));
        } catch (err) {
            console.log(err);
        }
    };
    reader.readAsText(file);
}

let badExt = [];
let goodExt = [];

const validateExt = (name) => {
    if (!name.toLowerCase().match(/\.json$/)){
        badExt.push(name);
        console.log(badExt);
        return false;
    } else {
        goodExt.push(name);
        console.log(goodExt);
        return true;
    };
}