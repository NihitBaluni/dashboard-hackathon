var app = angular.module('chirpApp', ['ngRoute', 'ngResource', 'ngStorage']).run(function($rootScope, $http, $localStorage, $location){
    $rootScope.authenticated = false;
    $rootScope.currentUser = '';

    $rootScope.logOut = function(){
        $http.get('/auth/signout').success(function() {
            $rootScope.authenticated = $localStorage.authenticated = false;
            $rootScope.currentUser = $localStorage.user = '';
            $location.path('/login');
        });
    };
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './../partials/main.html',
            controller: 'mainController'
        })
        .when('/login', {
            templateUrl: './../partials/login.html',
            controller: 'authController'
        })
        .when('/register', {
            templateUrl: './../partials/register.html',
            controller: 'authController'
        });
});

app.factory('postService', function($resource) {
    return $resource('/api/posts/:id');
});

app.controller('mainController', function($scope, postService, $rootScope, $localStorage){
    $rootScope.authenticated = $localStorage.authenticated;
    $rootScope.currentUser = $localStorage.user;
    $scope.posts = postService.query();
    $scope.newPosts = {
        createdBy: '',
        text: '',
        createdAt: ''
    };
    $scope.post = function() {
        $scope.newPosts.createdBy = $rootScope.currentUser;
        $scope.newPosts.createdAt = Date.now();

        postService.save($scope.newPosts, function() {
            $scope.posts = postService.query();
            $scope.newPosts = {
                createdBy: '',
                text: '',
                createdAt: ''
            };
        });
        $scope.posts.push($scope.newPosts);
        $scope.newPosts = {
            createdBy: '',
            text: '',
            createdAt: ''
        };
    }
});
app.controller('authController', function($scope, $rootScope, $http, $location, $localStorage){
    $scope.user = {
        userName: '',
        password: ''
    };
    $scope.errorMessage = '';

    $scope.login = function() {
        $http.post('/auth/login', $scope.user).success(function(data) {
            console.log(data);
            console.log(data.user.username);
            if(data.user.username) {
                $rootScope.authenticated = $localStorage.authenticated = true;
                $rootScope.currentUser = $localStorage.user =  data.user.username;
            }
            $location.path('/')
        });
    }
    $scope.register = function() {
        $http.post('/auth/signup', $scope.user).success(function(data) {
            $rootScope.authenticated = true;
            $rootScope.currentUser = data.user.username;
            $location.path('/')
        });
    }

});