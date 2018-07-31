//facets.facet.facet_search_also
class SearchAlsoController {
  constructor($translate, $scope){

    $scope.$watch(() => {
        return this.parentCtrl.parentCtrl.facetService.results;
    }, (n,o) => {
      if (n != o) {
        if (this.parentCtrl.parentCtrl.facetService.results.filter(f => {return f.name == 'search_also'}).length == 0) {
          this.parentCtrl.parentCtrl.facetService.results.unshift({
            name: 'search_also',
            displayedType: 'exact',
            limitCount: 0,
            facetGroupCollapsed: false,
            values: undefined
          });
        }
      }
    });
    
  }
}

SearchAlsoController.$inject = ['$translate', '$scope'];

export let searchAlsoConfig = {
  bindings:{parentCtrl:'<'},
  controller: SearchAlsoController
}
