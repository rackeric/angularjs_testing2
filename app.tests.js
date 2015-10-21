describe('ToolsCtrl', function(){

    // we'll use this scope in our tests
    var $httpBackend, $rootScope, createController;
 
    // mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('pivotApp'));

    beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        // backend definition common for all tests
        $httpBackend.when('GET', '/api/tools')
                             .respond({ "tooldesc" : "this is cloud manifest",
                                        "toolname" : "Cloud Manifest",
                                        "toolurl" : "cloudmanifest.com" });

        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');

        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');

        createController = function() {
            return $controller('ToolsCtrl', {'$scope' : $rootScope });
        };
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    // tests start here //

    // test initial setting of tools var
    it('should have tools from api', function(){
        var controller = createController();
        $httpBackend.flush();
        expect($rootScope.tools).toEqual({ "tooldesc" : "this is cloud manifest", "toolname" : "Cloud Manifest", "toolurl" : "cloudmanifest.com" });
        expect($rootScope.tools.toolname).toBe("Cloud Manifest");
    });

    // test addTool()
    it('should send new tool to api', function() {
        var controller = createController();
        $httpBackend.flush();

        $rootScope.newName = "new tool";
        $rootScope.newUrl = "newtool.com";
        $rootScope.newDesc = "new tool description";
        $rootScope.current_id = "123456";
        $httpBackend.expectPOST('/api/tools', {"toolname":$rootScope.newName, "toolurl":$rootScope.newUrl, "tooldesc":$rootScope.newDesc}).respond(200, '');
        $rootScope.addTool();
        $httpBackend.flush();
        expect($rootScope.tools.toolname).toBe("Cloud Manifest");
        expect($rootScope.valid).toBe(true);
    });

    // test deleteTool()
    it('should delete specific tool', function() {
        var controller = createController();
        $httpBackend.flush();

        $httpBackend.expectDELETE('/api/tools/123456').respond(200, '')

        $rootScope.deleteTool('123456');
        $httpBackend.flush();

        expect($rootScope.valid).toBe(true);
    });

    // test updateEditForm()
    it('should update vars in the DOM', function() {
        var controller = createController();
        $httpBackend.flush();

        $httpBackend.expectGET('/api/tools/123456').respond(200, {"toolname":"tool1", "toolurl":"tool1.com", "tooldesc":"tool1 description"});

        $rootScope.updateEditForm('123456');
        $httpBackend.flush();

        expect($rootScope.newName).toBe('tool1');
        expect($rootScope.newUrl).toBe('tool1.com');
        expect($rootScope.newDesc).toBe('tool1 description');
        expect($rootScope.current_id).toBe('123456');
    });

    // test updateTool()
    it('should delete specific tool', function() {
        var controller = createController();
        $httpBackend.flush();

        $rootScope.newName = "new tool";
        $rootScope.newUrl = "newtool.com";
        $rootScope.newDesc = "new tool description";
        $rootScope.current_id = "123456";
        $httpBackend.expectPUT('/api/tools/123456', {"toolname":$rootScope.newName, "toolurl":$rootScope.newUrl, "tooldesc":$rootScope.newDesc}).respond(200, '');

        $rootScope.updateTool();
        $httpBackend.flush();

        expect($rootScope.valid).toBe(true);
    });

    // test clearToolForm()
    it('should clear out the input values', function(){
        var controller = createController();
        $httpBackend.flush();

        $rootScope.newName = "new tool";
        $rootScope.newUrl = "newtool.com";
        $rootScope.newDesc = "new tool description";
        $rootScope.current_id = "12345";

        expect($rootScope.newName).not.toBe("");
        expect($rootScope.newUrl).not.toBe("");
        expect($rootScope.newDesc).not.toBe("");
        expect($rootScope.current_id).not.toBe("");

        $rootScope.clearToolForm();

        expect($rootScope.newName).toBe("");
        expect($rootScope.newUrl).toBe("");
        expect($rootScope.newDesc).toBe("");
        expect($rootScope.current_id).toBe("");
    });

});
