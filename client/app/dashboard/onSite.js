angular.module('hunt.onSite', [])

.controller('OnSiteController', function ($scope, $rootScope, $window, OnSite, Offer) {
  $rootScope.onSites = [];
  $rootScope.selectedOnSite;
  $rootScope.selectedOnSiteIndex;

  $scope.getOnSites = function () {
    // user id is added on the backend
    OnSite.getOnSites()
    .then(function (data) {
      $rootScope.onSites = data;
    }).catch(function (error) {
      console.error(error);
    });
  };

  $scope.removeOnSite = function (onSiteListItem) {
    // OnSiteFactory.edit(onSiteListItem);
  };

  $scope.moveToOffer = function() {
    // user id is added on the backend
    var newOffer = {
      application_id: $rootScope.selectedOnSite.application_id,
      status: 'Pending'
    }

    Offer.addOffer(newOffer)
      .then(function (offer) {
        $rootScope.offers.push(offer);
      })
      .catch(function (error) {
        console.log("Error creating Offer list item on OnSite status change : ", error);
      });
  };

  $scope.clickedOnSite = function(onSite, index) {
    $rootScope.selectedOnSite = onSite;
    // convert string (if it exists) to Date object
    if ($rootScope.selectedOnSite.date_time) {
      $rootScope.selectedOnSite.date_time = new Date($rootScope.selectedOnSite.date_time);
    }
    $rootScope.selectedOnSiteIndex = index;
  };

  $scope.submitChanges = function() {
    OnSite.editOnSite($rootScope.selectedOnSite)
      .then(function (onSite) {
        $rootScope.onSites.splice($rootScope.selectedOnSiteIndex, 1, onSite);
      })
      .catch(function (error) {
        console.error("There was an error submitting changes to onSite: ", error);
      });

      if ($rootScope.selectedOnSite.status === "Accepted") {
        $scope.moveToOffer();
      }
  };

  $scope.getOnSites();
})

.factory('OnSite', function ($http) {
  var getOnSites = function () {
    return $http({
      method: 'GET',
      url: '/api/onsites'
    }).then(function (res) {
      return res.data;
    }).catch(function (error) {
      console.error(error);
    });
  };

  var addOnSite = function (onSite) {
    return $http({
      method: 'POST',
      url: 'api/onsites',
      data: onSite
    }).then(function (res) {
      return res.data;
    }).catch(function (error) {
      console.error(error);
    });
  };

  var editOnSite = function (onSite) {
    return $http({
      method: 'PUT',
      url: 'api/onsites',
      data: onSite
    }).then(function (res) {
      return res.data;
    }).catch(function (error) {
      console.error(error);
    })
  };

  return {
    getOnSites: getOnSites,
    addOnSite: addOnSite,
    editOnSite: editOnSite
  }
});