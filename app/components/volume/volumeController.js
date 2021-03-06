angular.module('volume', [])
.controller('VolumeController', ['$scope', '$state', '$transition$', 'VolumeService', 'Notifications',
function ($scope, $state, $transition$, VolumeService, Notifications) {

  $scope.removeVolume = function removeVolume() {
    $('#loadingViewSpinner').show();
    VolumeService.remove($scope.volume)
    .then(function success(data) {
      Notifications.success('Volume successfully removed', $transition$.params().id);
      $state.go('volumes', {});
    })
    .catch(function error(err) {
      Notifications.error('Failure', err, 'Unable to remove volume');
    })
    .finally(function final() {
      $('#loadingViewSpinner').hide();
    });
  };

  function initView() {
    $('#loadingViewSpinner').show();
    VolumeService.volume($transition$.params().id)
    .then(function success(data) {
      var volume = data;
      $scope.volume = volume;
    })
    .catch(function error(err) {
      Notifications.error('Failure', err, 'Unable to retrieve volume details');
    })
    .finally(function final() {
      $('#loadingViewSpinner').hide();
    });
  }

  initView();
}]);
