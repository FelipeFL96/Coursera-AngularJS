(function () {
    'use strict'

    const module2 = angular.module("ShoppingListCheckOffService", []);

    module2.controller("ToBuyController", ToBuyController);
    module2.controller("AlreadyBoughtController", AlreadyBoughtController);
    module2.service("BuyService", BuyService);

    var shoppingList = [
        { name: "Biscuits", quantity: 4 },
        { name: "Madelaines", quantity: 3 },
        { name: "Pains au Lait", quantity: 5 },
        { name: "Croissants", quantity: 12 },
        { name: "Crêpes", quantity: 7 },
        { name: "Brioches", quantity: 8 },
    ];

    ToBuyController.$inject = ["BuyService"];
    function ToBuyController (BuyService) {
        var tobuy = this;
        
        tobuy.list = BuyService.getToBuyItems();

        tobuy.buy = function (item) {
            BuyService.buyItem(item);
        }
    }

    AlreadyBoughtController.$inject = ["BuyService"];
    function AlreadyBoughtController (BuyService) {
        var bought = this;

        bought.list = BuyService.getBoughtItems();
    }

    function BuyService() {
        var service = this;

        var tobuyList = shoppingList;
        var boughtList = [];

        service.buyItem = function (item) {
            const index = tobuyList.findIndex(i => i.name == item.name && i.quantity == item.quantity);
            tobuyList.splice(index, 1);
            boughtList.push(item);
        }

        service.getToBuyItems = function () {
            return tobuyList;
        }

        service.getBoughtItems = function () {
            return boughtList;
        }
        
    }

})();