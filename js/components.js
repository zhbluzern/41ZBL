/*
  Declare your components here.

  Rewrite this when imports can be done dynamically
  http://2ality.com/2017/01/import-operator.html

  KULeuven/LIBIS (c) 2017
  Mehmet Celik
*/
import './utils'

/* import your component configuration*/
import {pnxXmlConfig} from './components/prmSearchResultThumbnailContainerAfter/pnxXml'
import {sfxLinksConfig} from './components/prmViewOnlineAfter/sfxLinks.js'
import {altmetricConfig} from './components/prmBriefResultAfter/altmetric'
import {linksConfig} from './components/general/links'
import {locationLinksConfig} from './components/general/locationLinks'
import {searchAlsoConfig} from './components/prmFacetAfter/searchAlso'
import {searchAlsoBodyConfig} from './components/prmFacetExactAfter/searchAlsoBody'
import {browseButtonConfig} from './components/prmSearchBarAfter/browseButton'
import {finesMessageConfig} from './components/prmTopBarBefore/finesMessage'
import {alertMessageConfig} from './components/prmTopBarBefore/alertMessage'
import {vScoutConfig} from './components/general/vScout'
import {libInfoConfig} from './components/general/libInfo'

export default class AfterComponents {

  static get all() {
    /*
      name = the sub element in the after element
      config = the imported configuration object
      enabled = true/false should the component be created
      appendTo = The component should be created in this after component.

      ex. {name: 'home-icon', config: homeIconConfig, enabled: true, appendTo: 'prm-logo-after'}
      results in:
        <prm-logo-after parentCtrl='$ctrl'>
          <home-icon parentCtrl='$ctrl'></home-icon>
        </prm-logo-after>
    */
    return [{
        name: 'pnx-xml',
        config: pnxXmlConfig,
        enabled: true,
        appendTo: 'prm-brief-result-container-after',
        enableInView: '.*'
      },
      {
        name: 'zbl-sfx-links',
        config: sfxLinksConfig,
        enabled: true,
//        appendTo: 'prm-brief-result-container-after',
        appendTo: 'prm-view-online-after',
        enableInView: '.*'
      },
      {
        name: 'altmetric',
        config: altmetricConfig,
        enabled: true,
        appendTo: 'prm-brief-result-after',
        enableInView: '.*'
      },
      {
        name: 'zbl-link',
        config: linksConfig,
        enabled: true,
        appendTo: null,
        enableInView: '.*'
      },
      {
        name: 'zbl-location-items-link',
        config: locationLinksConfig,
        enabled: true,
        appendTo: 'prm-location-items-after',
        enableInView: '.*'
      },
      {
        name: 'zbl-search-also',
        config: searchAlsoConfig,
        enabled: true,
        appendTo: 'prm-facet-after',
        enableInView: '.*'
      },
      {
        name: 'zbl-search-also-body',
        config: searchAlsoBodyConfig,
        enabled: true,
        appendTo: 'prm-facet-exact-after',
        enableInView: '.*'
      },
      {
        name: 'zbl-browse-button',
        config: browseButtonConfig,
        enabled: true,
        appendTo: 'prm-search-bar-after',
        enableInView: '.*'
      },
      {
        name: 'zbl-alert-message',
        config: alertMessageConfig,
        enabled: true,
        appendTo: 'prm-top-bar-before',
        enableInView: '.*'
      },
      {
        name: 'zbl-fines-message',
        config: finesMessageConfig,
        enabled: false,
        appendTo: 'prm-top-bar-before',
        enableInView: '.*'
      },
      {
        name: 'zbl-vscout',
        config: vScoutConfig,
        enabled: true,
        appendTo: null,
        enableInView: '.*'
      },
      {
        name: 'zbl-lib-info',
        config: libInfoConfig,
        enabled: true,
        appendTo: null,
        enableInView: '.*'
      }
    ].filter((component) => (component.enabled && new RegExp(component.enableInView).test(window.appConfig.vid)));
  }
}
