class InvertedIndex {
  constructor() {
    this.searchIndices = {};
    this.indexedFiles = {};
  }

  readFile( aFiles ) {
    console.log( aFiles, 'aFiles' );
    aFiles.forEach( ( file ) => {
      // console.log(file, "file one");
      readEachfile( file );
    } );
  }

  validateFile( jsonContent ) {
    jsonContent.forEach( ( doc ) => {
      if ( doc.hasOwnProperty( 'title' ) && doc.hasOwnProperty( 'text' ) ) {
        console.log( doc.title );
      } else { console.log( true ); }
    } );
  }

  static unique( array ) {
    if ( Array.isArray( array ) ) {
      const checked = {};
      return array.filter( ( item ) => {
        if ( !checked[ item ] ) {
          checked[ item ] = true;
          return item;
        }
        return null;
      } );
    }
    return [ 'invalid data type supplied' ];
  }

  static tokenizeWords( text ) {
    for ( const doc in text ) {
      const invalid = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
      text[ doc ] = text[ doc ].replace( invalid, '' );
    }
    return text;
  }

  static splitSort( docObject ) {
    const docKeys = Object.keys( docObject );
    docKeys.forEach( ( key ) => {
      const words = docObject[ key ].toLowerCase().split( ' ' ).sort();
      docObject[ key ] = InvertedIndex.unique( words );
    } );
    console.log( docObject );
    return docObject;
  }

  static concatenateText() {
    // if a document exists? combine title and text to split at once
    const concatenatedText = {};
    book1.forEach( ( bookContent, bookIndex ) => {
      if ( book1.hasOwnProperty( bookIndex ) ) {
        concatenatedText[ bookIndex ] = `${bookContent.title  } ${  bookContent.text}`;
      }
    } );
    return concatenatedText;
  }


  createIndex( fileContent ) {
    // let tokenizedText={};
    const fileObject = JSON.parse( fileContent );
    // combine Title and Text
    const joinedkeys = InvertedIndex.concatenateText( fileObject );
    const tokenizedWords = InvertedIndex.tokenizeWords( joinedkeys );
    const splittedWords = InvertedIndex.splitSort( tokenizedWords );
    // index words
    console.log( splittedWords );
    Object.keys( splittedWords ).forEach( ( keys ) => {
      splittedWords[ keys ].forEach( ( words ) => {
        if ( !this.indexedFiles.hasOwnProperty( words ) ) {
          this.indexedFiles[ words ] = [ keys ];
        } else { this.indexedFiles[ words ].push( keys ); }
      } );
    } );

    return this.indexedFiles;
  }

  getIndex( searchWords ) {
    return 'Found Index';
  }

  searchIndex( searchWords, fileName ) {
    const searchResult = {};
    if ( typeof searchWords !== 'string' ) {
      return false;
    }
    searchWords = this.tokenize( searchWords );
    console.log( searchWords );
    const index = this.indices[ fileName ];
    if ( !index ) {
      return false;
    }
    console.log( index );
    searchWords.forEach( ( word ) => {
      if ( index[ word ] ) {
        searchResult[ word ] = index[ word ];
      }
    } );

    this.searchIndices[ fileName ] = searchResult;
    return this.searchIndices[ fileName ];
  }

}


// let allFiles = [];
// const invertedIndex = new InvertedIndex();
// const fileInput = document.getElementById('fUpload');
// fileInput.addEventListener('change', () => {
//     //get files and validate extension
//     allFiles = [];
//     console.log(fileInput.files);
//     Object.keys(fileInput.files).forEach((file) => {
//         const eachFile = fileInput.files[file];
//         if (validateExt(eachFile.name)) {  //validate eachfile extention and push good files into allFiles
//             allFiles.push(eachFile);
//         } else {
//             console.log(eachFile.name+' is not valid');
//         }
//     });

// });


//     const readEachfile = (file) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//         try {
//            let result =event.target.result;
//             console.log(invertedIndex.tokenizeWords(result));
//             console.log(invertedIndex.createIndex(result));
//         } catch (err) {
//             console.log(err);
//         }
//     };
//     reader.readAsText(file);
// }

// const readFile = () => {
//     invertedIndex.readFile(allFiles);
// }


// let badExt = [];
// let goodExt = [];

// const validateExt = (name) => {
//     if (!name.toLowerCase().match(/\.json$/)){
//         badExt.push(name);
//         console.log(badExt);
//         return false;
//     } else {
//         goodExt.push(name);
//         console.log(goodExt);
//         return true;
//     };
// }
