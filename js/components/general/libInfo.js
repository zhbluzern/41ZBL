import libInfoHTML from './libInfo.html'

class LibInfoController{
  constructor($translate){
    let self = this;
    self.translate = $translate;
    self.iconUrl = `/custom/${window.appConfig.vid}/img/information.png`;

    self.translate('nui.customizing.idslu.informationicon').then((iconUrl) => {
      if (iconUrl !== 'informationicon'){
          self.iconUrl = iconUrl;
      }
    });
  }

  get sourceURL() {
    return encodeURIComponent(`http://ilu.zhbluzern.ch/F?func=library&sub_library=${this.locationCode}`)
  }
}

LibInfoController.$inject = ['$translate'];

export let libInfoConfig = {
  bindings: {locationCode:'<'},
  controller: LibInfoController,
  template: libInfoHTML
}
