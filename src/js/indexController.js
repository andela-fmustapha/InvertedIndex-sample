angular.module( 'angular', [] )
  .controller( 'index', [ '$scope', function ( $scope ) {
    $scope.message = "About this application!/n Users should be able to click an 'Upload File' to upload book files" +
      'Allow multiple uploads' +
      "Users should be able to click a 'Create Index' button to create an Inverted for uploaded files" +
      'Users should be able to search through files that have been indexed' +
      'Allow Users search through selected files' +
      'Allow Users search through all indexed files';

    $scope.result = 'not done yet';
    $scope.allFiles;
    let allFiles = [];
    const invertedIndex = new InvertedIndex();
    // console.log(invertedIndex.validateFile([]))

    $scope.validateFileExt = () => {
      const fileInput = document.getElementById( 'fUpload' );
      // get files and validate extension
      console.log( 'hello' )
      $scope.result = 'done now';
      allFiles = [];
      console.log( fileInput.files );
      Object.keys( fileInput.files ).forEach( ( file ) => {
        const eachFile = fileInput.files[ file ];
        if ( validateExt( eachFile.name ) ) { // validate eachfile extention and push good files into allFiles
          allFiles.push( eachFile );
          $scope.allFiles = allFiles;
        } else {
          console.log( `${eachFile.name  } is not valid` );
        }
      } );
    };

    $scope.readAllFiles = () => {
      // console.log($scope.allFiles);
      // ReadFile using file reader
      $scope.allFiles.forEach( ( eachFile ) => {
        const reader = new FileReader();
        reader.onload = ( () => ( event ) => {
          try {
            const result = JSON.parse( event.target.result );
            invertedIndex.validateFile( result );
            console.log( invertedIndex.createIndex( result ) );
            //console.log( 'cool' )
          } catch ( err ) {
            console.log( err );
          }
        } )( eachFile );
        reader.readAsText( eachFile );
      } );
    };


    // const readFile = () => {
    //     invertedIndex.readFile(allFiles);
    // }


    // validate file extensions
    const badExt = [];
    const goodExt = [];

    const validateExt = ( name ) => {
      if ( !name.toLowerCase().match( /\.json$/ ) ) {
        badExt.push( name );
        console.log( badExt );
        return false;
      }
      goodExt.push( name );
      console.log( goodExt );
      return true;;
    };
  } ] );
