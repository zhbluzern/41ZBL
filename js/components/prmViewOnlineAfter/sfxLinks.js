import sfxLinksHTML from './sfxLinks.html'
import Helper from '../../primo-explore-dom/js/primo/explore/helper'

class SfxLinksController {
  constructor($scope) {
    let self = this;
    self.scope = $scope;
    //self.item = self.parentCtrl.parentCtrl.item;
    let containers = Primo.explore.components.get('prm-full-view-service-container');
    if (containers && containers.length > 0) {
      self.item = containers[0].ctrl().item;
    } else {
      self.item = self.parentCtrl.parentCtrl.item;
    }
    self.targets = {};
    self.updateTargetsWhenOpenURLAvailable();
  }

  updateTargetsWhenOpenURLAvailable() {
    let self = this;
    let watcher = self.scope.$watch(() => {
      try {
        if (self.openurl && self.openurl.length > 0) {
          return true;
        } else {
          return false;
        }

      } catch (e) {
        return false;
      }
    }, (n, o) => {
      if (n == true) {
        //console.log(self.targetsUrls);
        self.targetsUrls.forEach(targetsUrl => {
          //console.log(targetsUrl);
          Helper.http.get(targetsUrl).then(rawTargets => {
            //console.log(rawTargets);
            if (rawTargets.data && rawTargets.data.length > 0) {
              let data = Object.assign({}, self.targets, self.normalizeTargets(rawTargets.data));
              //console.log(data);
              if (data) {
                self.targets = data;
                //console.log('-----> targets', self.targets);
              }

            }
          });
        });
        watcher();
      }
    });
  }

  normalizeTargets(targets) {
    let self = this;
    let normalizedTargets = {};

    targets.reduce((t, c) => {
      let d = t.hasOwnProperty(c.facility) ? t[c.facility] : [];
      d.push(c);
      t[c.facility] = d;
      return t;
    }, normalizedTargets);

    return normalizedTargets;
  }

  get targetsUrls() {
    return this.openurl.map(m => (`${this.lookupURL}?type=targets&sourceURL=${encodeURIComponent(m)}&proxySuffix=${encodeURIComponent(this.proxySuffix)}`));
  }

  get openurl() {
    let self = this;
    let list = [];
    if (self.item && self.item.delivery) {
      let openUrlList = self.item.delivery.link.filter(f => /^openurl/.test(f.displayLabel)).map(m => m.linkURL);
      if (openUrlList.length > 0) {
        list = list.concat(openUrlList);
      }
    }

    if (self.item && self.item.linkElement) {
      let openUrlList = self.item.linkElement.links.filter(f => /^openurl/.test(f.displayText)).map(m => m.link);
      if (openUrlList.length > 0) {
        list = list.concat(openUrlList);
      }
    }

    return list;
  }

  get proxySuffix() {
    let currentHost = window.location.host;
    let proxySuffix = '';
    if (currentHost.match(/exlibrisgroup.com/g) != null) {
      proxySuffix = currentHost.replace(/.+\.exlibrisgroup\.com/g, '');
    }

    return proxySuffix;
  }

  get lookupURL() {
    return document.location.protocol + '//primo.advesta.com/index.php';
  }
}

SfxLinksController.$inject = ['$scope'];

export let sfxLinksConfig = {
  bindings: {
    parentCtrl: '<'
  },
  controller: SfxLinksController,
  template: sfxLinksHTML
}
