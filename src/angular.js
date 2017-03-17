angular.module('angular', [])
    .controller("index", ["$scope", function($scope) {
    $scope.message= "About this application!/n Users should be able to click an 'Upload File' to upload book files"+ 
"Allow multiple uploads"+
"Users should be able to click a 'Create Index' button to create an Inverted for uploaded files"+ 
"Users should be able to search through files that have been indexed"+ 
"Allow Users search through selected files"+
"Allow Users search through all indexed files";
    }]); 
//angular.controller()