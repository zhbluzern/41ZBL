import browseButtonHTML from './browseButton.html'

class BrowseButtonController {
  constructor($state, $compile, $scope) {
    this.state = $state;
    this.scope = $scope;
    this.compile = $compile;
  }

  $onInit() {
    angular.element(document.querySelector('.search-switch-buttons'))
                              .append(this.compile(browseButtonHTML)(this.scope));
  }

  switchBrowse() {
    this.state.go('exploreMain.browseSearch', {vid: window.appConfig.vid});
  }
}

BrowseButtonController.$inject = ['$state', '$compile', '$scope'];

export let browseButtonConfig = {
  bindings : {
    parentCtrl: '<'
  },
  controller: BrowseButtonController,
  template: ''
}
