class AlertMessageController {
  constructor($scope, MessageService) {
    MessageService.show('', $scope);
  }
}

AlertMessageController.$inject = ['$scope', 'MessageService'];

export let alertMessageConfig = {
  bindings: {parentCtrl: '<'},
  controller: AlertMessageController,
  template: ''
}
