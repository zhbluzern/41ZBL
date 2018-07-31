import {vScoutHTML} from './vScout.html'

class VScoutController {
  constructor($translate){
    let self = this;    
    self.translate = $translate;
    self.iconUrl = `/custom/${window.appConfig.vid}/img/map-marker.png`
    self.translate('nui.customizing.idslu.vscouticon').then((iconUrl) => {
      if (iconUrl !== 'vscouticon'){
          self.iconUrl = iconUrl;
      }
    });

  }

  get url() {
    return `http://rauminfo-upg.zhbluzern.ch${this.proxySuffix}/?sig=${encodeURIComponent(this.locationCode)}`
  }

  get proxySuffix() {
    let currentHost = window.location.host;
    let proxySuffix = '';
    if (currentHost.match(/exlibrisgroup.com/g) != null) {
      proxySuffix = currentHost.replace(/.+\.exlibrisgroup\.com/g, '');
    }

    return proxySuffix;
  }

  get showVScout() {
    return ['41ZBL_LUPHL'].includes(this.libraryCode);
  }
}

VScoutController.$inject = ['$translate'];

export let vScoutConfig = {
  bindings: {locationCode: '<', libraryCode:'<'},
  controller: VScoutController,
  template: vScoutHTML
}
