angular

.module('pivotApp', [])

.controller("ToolsCtrl", function ($scope, $http) {

    $scope.valid = false;

    // initial get of tools collection
    $http.get("/api/tools").success(function (response) {
        $scope.tools = response;
    });

    $scope.addTool = function () {
        // needs input validation
        $http.post("/api/tools", {"toolname":$scope.newName, "toolurl":$scope.newUrl, "tooldesc":$scope.newDesc}).success(function(data) {
            // CHANGED FROM LOCAL tools var list to just grabbing list again from API
            //$scope.tools.push({"toolname":$scope.newName, "toolurl":$scope.newUrl, "tooldesc":$scope.newDesc});
            $http.get("/api/tools").success(function (response) {
                $scope.tools = response;
            });
            $scope.valid = true;
        });
        $scope.clearToolForm();
    };

    $scope.deleteTool = function(myId) {
        $http.delete("/api/tools/" + myId).success(function (response) {
            $http.get("/api/tools").success(function (response) {
                $scope.tools = response;
            });
            $scope.valid = true;
        });
    };

    $scope.updateEditForm = function(myId) {
        $http.get("/api/tools/" + myId).success(function(response) {
            $scope.myTool = response;
            $scope.wordtest = "this now";
            $scope.newName = $scope.myTool.toolname;
            $scope.newUrl = $scope.myTool.toolurl;
            $scope.newDesc = $scope.myTool.tooldesc;
            $scope.current_id = myId

        });
    };

    $scope.updateTool = function() {
        $http.put("/api/tools/" + $scope.current_id, {"toolname":$scope.newName, "toolurl":$scope.newUrl, "tooldesc":$scope.newDesc}).success(function (response) {
            $http.get("/api/tools").success(function (response) {
                $scope.tools = response;
            });
            $scope.valid = true;
        });
       $scope.clearToolForm();
    }

    $scope.clearToolForm = function() {
        $scope.newName = "";
        $scope.newUrl = "";
        $scope.newDesc = "";
        $scope.current_id = "";
    };
})


.controller("ArticlesCtrl", function ($scope, $http) {

    // initial get of articles collection
    $http.get("/api/articles").success(function (response) {
        $scope.articles = response;
    });

    $scope.addArticle = function () {
        // needs input validation
        $http.post("/api/articles", {"articlename":$scope.newName, "articleurl":$scope.newUrl, "articledesc":$scope.newDesc}).success(function(data) {
            // CHANGED FROM LOCAL articles var list to just grabbing list again from API
            //$scope.articles.push({"articlename":$scope.newName, "articleurl":$scope.newUrl, "articledesc":$scope.newDesc});
            $http.get("/api/articles").success(function (response) {
                $scope.articles = response;
            });
        });
        $scope.clearArticleForm();
    };


    $scope.deleteArticle = function(myId) {
        console.log(myId);
        $http.delete("/api/articles/" + myId).success(function (response) {
            // CHANGED FROM LOCAL articles var list to just grabbing list again from API
            //$scope.articles.splice($scope.articles.indexOf(myId), 1);
            $http.get("/api/articles").success(function (response) {
                $scope.articles = response;
            });
        });
    };

    $scope.updateEditForm = function(myId) {
        console.log("inside updateEditForm function " + myId)
        $http.get("/api/articles/" + myId).success(function(response) {
            $scope.myArticle = response;
            console.log("inside http >" + response);
            $scope.wordtest = "this now";
            $scope.newName = $scope.myArticle.articlename;
            $scope.newUrl = $scope.myArticle.articleurl;
            $scope.newDesc = $scope.myArticle.articledesc;
            $scope.current_id = myId

        });
    };

    $scope.updateArticle = function() {
        $http.put("/api/articles/" + $scope.current_id, {"articlename":$scope.newName, "articleurl":$scope.newUrl, "articledesc":$scope.newDesc}).success(function (response) {
            //$scope.article.splice($scope.article.indexOf($scope.current_id), 1);
            //$scope.article.push({"articlename":$scope.newName, "articleurl":$scope.newUrl, "articledesc":$scope.newDesc});
            $http.get("/api/articles").success(function (response) {
                $scope.articles = response;
            });
        });
       $scope.clearArticleForm();
    }

    $scope.clearArticleForm = function() {
        $scope.newName = "";
        $scope.newUrl = "";
        $scope.newDesc = "";
        $scope.current_id = "";
    };
})

.controller("CustomersCtrl", function ($scope, $http) {

    // initial get of customers collection
    $http.get("/api/customers").success(function (response) {
        $scope.customers = response;
    });

    $scope.addCustomer = function () {
        // needs input validation
        $http.post("/api/customers", {"customername":$scope.newName, "ddi":$scope.newDdi}).success(function(data) {
            $http.get("/api/customers").success(function (response) {
                $scope.customers = response;
            });
        });
        $scope.clearCustomerForm();
    };


    $scope.deleteCustomer = function(myId) {
        console.log(myId);
        $http.delete("/api/customers/" + myId).success(function (response) {
            $http.get("/api/customers").success(function (response) {
                $scope.customers = response;
            });
        });
    };

    $scope.updateEditForm = function(myId) {
        console.log("inside updateEditForm function " + myId)
        $http.get("/api/customers/" + myId).success(function(response) {
            $scope.myCustomer = response;
            console.log("inside http >" + response);
            $scope.wordtest = "this now";
            $scope.newName = $scope.myCustomer.customername;
            $scope.newDdi = $scope.myCustomer.ddi;
            $scope.current_id = myId

        });
    };

    $scope.updateCustomer = function() {
        $http.put("/api/customers/" + $scope.current_id, {"customername":$scope.newName, "ddi":$scope.newDdi}).success(function (response) {
            $http.get("/api/customers").success(function (response) {
                $scope.customers = response;
            });
        });
       $scope.clearCustomerForm();
    }

    $scope.clearCustomerForm = function() {
        $scope.newName = "";
        $scope.newDdi = "";
        $scope.current_id = "";
    };
})

.controller("CustomerCtrl", function ($scope, $http, $routeParams) {
    // set customerId from URL
    $scope.customerId = $routeParams.customerId;

    console.log($scope.customerId);

    $scope.notes = {};

    // initial get of notes
    $http.get("/api/customers/" + $scope.customerId + "/notes").success(function (response) {
        $scope.notes = response;
    });


    // Add new note to Customer
    $scope.addNote = function() {
        $http.post("/api/customers/" + $scope.customerId + "/notes", { id: Object.keys($scope.notes).length, body: $scope.newNote, author: $scope.author } ).success(function(data) {
            $http.get("/api/customers/" + $scope.customerId + "/notes").success(function (response) {
                $scope.notes = response;
            });
        });
        $scope.clearNotesForm();
    };

    // Delete note from customer
    $scope.deleteNote = function(noteId) {
        $http.delete("/api/customers/" + $scope.customerId + "/notes/" + noteId, { "id": noteId }).success(function (response) {
            $http.get("/api/customers/" + $scope.customerId + "/notes").success(function (response) {
                $scope.notes = response;
            });
        })
    }

     $scope.clearNotesForm = function() {
        $scope.newNote = "";
        $scope.author = "";
        $scope.current_id = "";
    };



});
