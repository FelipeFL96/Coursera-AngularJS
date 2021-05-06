(function(){
    'use strict'

    const NarrowItDownApp = angular.module('NarrowItDownApp', []);

    NarrowItDownApp.controller('NarrowItDownController', NarrowItDownController);
    NarrowItDownApp.service('MenuSearchService', MenuSearchService);
    NarrowItDownApp.directive('foundItems', foundItems);

    function foundItems() {
        var ddo = {
            templateUrl: "/templates/found-items.html",
            restrict: "E",
            scope: {
                found: "<",
                searched: "<",
                removeItem: "&"
            }
        };

        return ddo;
    }
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        const narrow = this;

        narrow.title = "Narrow it down App";
        narrow.query = '';
        narrow.found = [];
        narrow.searched = false;

        narrow.search = function () {
            MenuSearchService.getMatchedMenuItems(narrow.query)
            .then(function (found) {
                narrow.found = found;
                narrow.searched = true;
            });
        }

        narrow.removeItem = function (index) {
            console.log(index);
            narrow.found.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        const MenuSearch = this;

        MenuSearch.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
            })
            .then(function (result) {
                var foundItems = [];
                for (const item of result.data.menu_items) {
                    if (searchTerm != "" && item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                        foundItems.push(item);
                }
                return foundItems;
            })
            .catch(function (error) {
                console.error("Couldn't find the items: ", error);
            });
        }
    }

})();