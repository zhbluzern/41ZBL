var lookUpURL = document.location.protocol + '//primo.advesta.com/index.php';
var primoLoadingImage = $('<div class="loading-image"><img src="../images/icon_loading_circle.gif" /></div>');
var currentHost = window.location.host;
var proxySuffix = '';
if (currentHost.match(/exlibrisgroup.com/g) != null) {
  proxySuffix = currentHost.replace(/.+\.exlibrisgroup\.com/g, '');
}
var vScoutBase = {
  'ZHB Luzern - Uni/PH-Gebäude': 'http://rauminfo-upg.zhbluzern.ch' + proxySuffix + '/?sig='
};
$.ajax({
  url: document.location.protocol + '//primo.advesta.com/jquery.xdomainrequest.min.js',
  dataType: 'script',
  cache: true
}).done(function () {
});
if (!window.console) {
  var console = {
    log: function () {
    },
    warn: function () {
    },
    error: function () {
    },
    time: function () {
    },
    timeEnd: function () {
    }
  }
}
$(document).ready(function () {
  if ($('div.EXLFullDisplay').length) {
    $.addBibInfoToLocationsFullscreen($(this));
    var result = $(this);
    sfxURL = $(result).find('.EXLResultTabs').find('.EXLTabBoomId').attr('value');
    console.log('raw sfx url=');
    console.log(sfxURL);
    if (sfxURL.match(/(http:\/\/site.ebrary.com.*)/g) || sfxURL.match(/(https?:\/\/.*?dibizentral.ch.*)/g) || sfxURL.match(/(http:\/\/univportal.naxosmusiclibrary.com.*)/g) || sfxURL.match(/(https?:\/\/.*?rzblx10.uni-regensburg.de.*)/g) || sfxURL.match(/(https?:\/\/.*?imslp.org.*)/g)) {
      sfxURL = (sfxURL.match(/(http:\/\/site.ebrary.com.*)/g) || sfxURL.match(/(https?:\/\/.*?dibizentral.ch.*)/g) || sfxURL.match(/(http:\/\/univportal.naxosmusiclibrary.com.*)/g) || sfxURL.match(/(https?:\/\/.*?rzblx10.uni-regensburg.de.*)/g) || sfxURL.match(/(https?:\/\/.*?imslp.org.*)/g));
      sfxURL = sfxURL[0];
      console.log('found fancy:');
      console.log(sfxURL);
    } else {
      sfxURL = sfxURL.split('%26');
      sfxURL = sfxURL[6];
    }
    if (sfxURL == undefined || !$(result).find('.EXLViewOnlineTab').length) return true;
    if (sfxURL.match(/http:\/\/sfx.metabib.ch/g) == null && sfxURL.match(/http:\/\/site.ebrary.com/g) == null && sfxURL.match(/univportal.naxosmusiclibrary.com/g) == null && sfxURL.match(/rzblx10.uni-regensburg.de/g) == null) return true;
    var newTabLink = $('<li class="EXLResultTab EXLResultFirstTab onlineTab"><a href="javascript:void(0)">' + 'Online' + '</a></li>');
    var tabContainerId = 'exlidResult' + i + '-TabContainer-onlineTab';
    $.addOnlineTabContent(result, sfxURL, newTabLink, tabContainerId);
    if (sfxURL.match(/http:\/\/sfx.metabib.ch/g) != null || sfxURL.match(/http:\/\/site.ebrary.com/g) != null || sfxURL.match(/univportal.naxosmusiclibrary.com/g) != null || sfxURL.match(/rzblx10.uni-regensburg.de/g) != null) {
      $.addSFXLinksToDetailFullscreen(result, sfxURL);
      console.log('called addSFXLinks for ' + sfxURL);
    }
    $(result).find('.EXLViewOnlineTab').remove();
    console.log(sfxURL);
    return;
  }
  $('.EXLResult').each(function (i) {
    var result = $(this);
    if ($(result).find('.EXLLocationsTab')) {
      $.addBibInfoToLocations(result);
    }
    sfxURL = $(result).find('.EXLResultTitle').find('a').attr('href');
    if (sfxURL == undefined) return true;
    if (sfxURL.match(/http:\/\/sfx.metabib.ch/g) == null && sfxURL.match(/http:\/\/site.ebrary.com/g) == null && sfxURL.match(/univportal.naxosmusiclibrary.com/g) == null && sfxURL.match(/rzblx10.uni-regensburg.de/g) == null) return true;
    var newTabLink = $('<li class="EXLResultTab EXLResultFirstTab onlineTab"><a href="javascript:void(0)">' + 'Online' + '</a></li>');
    var tabContainerId = 'exlidResult' + i + '-TabContainer-onlineTab';
    $.addOnlineTabContent(result, sfxURL, newTabLink, tabContainerId);
    if (sfxURL.match(/http:\/\/sfx.metabib.ch/g) != null || sfxURL.match(/http:\/\/site.ebrary.com/g) != null || sfxURL.match(/univportal.naxosmusiclibrary.com/g) != null || sfxURL.match(/rzblx10.uni-regensburg.de/g) != null) {
      $.addSFXLinksToDetailTab(result, sfxURL, 1);
      console.log('called addSFXLinks for ' + sfxURL);
    }
    console.log(sfxURL);
    $(result).find('.EXLViewOnlineTab').remove();
    $(result).find('.EXLBriefResultsDisplayCoverImageBackup').find('a').attr('href', 'javascrpt:void(0);');
    $(result).find('.EXLBriefResultsDisplayCoverImage').find('a').attr('href', 'javascript:void(0);');
    $(result).find('.EXLBriefResultsDisplayCoverImage').find('a').attr('onclick', null);
    $(result).find('.EXLResultTitle').find('a').attr('href', 'javascript:void(0);');
    $(result).find('.EXLResultTitle').find('a').attr('onclick', null);
  });
});
$.onlineTabEvent = function (result, sfxURL, newTabLink, tabContainerId) {
}
$.addOnlineTabContent = function (result, sfxURL, newTabLink, tabContainerId) {
  $(result).find('.EXLResultTabs li.EXLResultFirstTab').removeClass('EXLResultFirstTab');
  $(result).find('.EXLResultTabs').prepend($(newTabLink));
  $(result).find('.EXLResultTab.EXLResultFirstTab.onlineTab a, .EXLResultTitle a, EXLBriefResultsDisplayCoverImageBackup a, .EXLBriefResultsDisplayCoverImage a').on('click', function () {
    $('#' + tabContainerId).find('.EXLTabContent ul').parents('.EXLTabContent').find('.SFXLinks').remove();
    if ($('#' + tabContainerId).css('display') == 'none' && $('#' + tabContainerId + ' li.fulltext-inst').length) {
      $.closeAllTabs(result);
      $('#' + tabContainerId).css('display', 'block');
      $(result).find('.EXLResultTab.EXLResultFirstTab.onlineTab a').parents('li').addClass('EXLResultSelectedTab');
      $(result).find('.EXLResultTab.EXLResultFirstTab.onlineTab a').parents('.EXLTabsRibbon').removeClass('EXLTabsRibbonClosed');
    } else if ($('#' + tabContainerId).css('display') == 'none') {
      $.closeAllTabs(result);
      $('#' + tabContainerId).css('display', 'block');
      $(result).find('.EXLResultTab.EXLResultFirstTab.onlineTab a').parents('li').addClass('EXLResultSelectedTab');
      $(result).find('.EXLResultTab.EXLResultFirstTab.onlineTab a').parents('.EXLTabsRibbon').removeClass('EXLTabsRibbonClosed');
      if ($('#' + tabContainerId).find('.fulltext-item').length == 0) {
        container = $('#' + tabContainerId).find('.EXLTabContent ul');
        $.getInstFullTextUrl(sfxURL, container);
      }
    } else {
      $('#' + tabContainerId).css('display', 'none');
      $(result).find('.EXLResultTab.EXLResultFirstTab.onlineTab a').parents('li').removeClass('EXLResultSelectedTab');
      $(result).find('.EXLResultTab.EXLResultFirstTab.onlineTab a').parents('.EXLTabsRibbon').addClass('EXLTabsRibbonClosed');
    }
  });
  var newTab = $.getTab(tabContainerId, 'EXLContainer-onlineTab');
  var ul = $('<ul class="fulltext-results"></ul>');
  $(newTab).find('.EXLTabContent').append(ul);
  $(result).find('.EXLSummary').append(newTab);
}
$.getInstFullTextUrl = function (sfxURL, targetContainerId) {
  var loadingImage;
  if ($(targetContainerId).parents('.EXLTabContent').find('div.loading-image').length == 0) {
    loadingImage = primoLoadingImage.clone();
    $(targetContainerId).parents('.EXLTabContent').append(loadingImage);
  } else {
    loadingImage = $(targetContainerId).parents('.EXLTabContent').find('div.loading-image');
  }
  console.log('type=targets&sourceURL=' + encodeURIComponent(sfxURL) + '&proxySuffix=' + encodeURIComponent(proxySuffix));
  $.ajax({
    url: lookUpURL,
    dataType: 'json',
    data: 'type=targets&sourceURL=' + encodeURIComponent(sfxURL) + '&proxySuffix=' + encodeURIComponent(proxySuffix),
    success: function (json) {
      console.log(json);
      var lastFacility = '';
      var additionalStyle = '';
      for (var number in json) {
        if (json[number]['facility'] == undefined) continue;
        if (lastFacility != json[number]['facility']) {
          var item = '<p class="fulltext-item" style="padding-top: 15px !important; margin-left: 25px !important; font-weight: bold;">Campusnetz ' + json[number]['facility'] + ':</p>';
        } else {
          var item = '';
        }
        console.log(json[number]);
        var item = item + '<p class="fulltext-item" style="margin-left: 25px !important;">Volltext via <a href="' + json[number]['target_url'] + '">' + json[number]['target_name'] + '</a></p>';
        lastFacility = json[number]['facility'];
        $(targetContainerId).parents('.EXLTabContent').append(item);
      }
      var item = '<p class="fulltext-item" style="padding-top: 15px !important; margin-left: 25px !important; font-weight: bold;">Nicht am Campus? <span style="font-weight: normal !important;"><a href="http://www.zhbluzern.ch' + proxySuffix + '/index.php?id=3992">Externer Zugriff f&uuml;r Campus-Angeh&ouml;rige</a></span></p>';
      $(targetContainerId).parents('.EXLTabContent').append(item);
      $(loadingImage).remove();
    },
    error: function (json) {
      console.log(json);
      if ($(targetContainerId).find('li').length > 1) $(loadingImage).remove();
    }
  });
}
$.getTab = function (tabId, tabClass) {
  newTab = $('<div id="' + tabId + '" class="EXLResultTabContainer ' + tabClass + ' EXLResultTabContainerClosed" style="display:none"></div>');
  if ($('div.EXLFullDisplay').length) {
    closeButtons = '';
  } else {
    closeButtons = '<div class="EXLTabHeaderButtons"><ul><li class="EXLTabHeaderButtonCloseTabs"><a href="#" title="Tabs ausblenden"><img src="../images/icon_close_tabs.png" alt="Tabs ausblenden" /></a></li></ul></div>';
  }
  tabHeader = $('<div class="EXLTabHeader">' + closeButtons + '</div>');
  tabContent = $('<div class="EXLTabContent"></div>');
  $(newTab).append(tabHeader);
  $(newTab).append(tabContent);
  return newTab;
}
$.closeAllTabs = function (result) {
  $(result).find('.EXLResultTabContainer').css('display', 'none');
  $(result).find('.EXLResultTab').removeClass('EXLResultSelectedTab');
  $(result).find('.EXLTabsRibbon').addClass('EXLTabsRibbonClosed');
  if ($('div.EXLFullDisplay').length) {
    $(document).find('#bibtip_reclist').css('display', 'block');
  }
}
$.addBibInfoToLocations = function (result) {
  $(result).find('.EXLLocationsTab a').click(function () {
    container = $(this).parent().parent().parent().parent().parent().find('.EXLResultTabContainer.EXLContainer-locationsTab');
    $(container).ajaxComplete(function () {
      if (!$(container).find('.injectedFacility').length) {
        $.addBibInfoInjector(container);
      }
    });
  });
}
$.addBibInfoInjector = function (container) {
  $(container).find('.EXLLocationsTitle').each(function (i) {
    current = $(this);
    newItem = $(current).find('a').attr('href');
    if (newItem == undefined) {
      newItem = $(container).parent().find('.EXLLocationsTabContent').find('.EXLLocationMainLocationCode').attr('value');
      locID = [
        '1234567890123' + newItem
      ];
    } else {
      locID = newItem.match(/mainLocation=[^&]+/g);
    }
    var currentFacility = $(current).find('.EXLLocationsTitleContainer').html().trim();
    $(current).find('.EXLLocationsTitleContainer').append(' <a class="injectedFacility" href="' + lookUpURL + '?type=getLibURL&sourceURL=' + encodeURIComponent('http://ilu.zhbluzern.ch/F?func=library&sub_library=' + locID[0].substring(13)) + '" target="_blank"><img src="http://ilu.zhbluzern.ch' + proxySuffix + '/local/primo/info_symbol.jpg" title="Informationen zu dieser Bibliothek" border="0" /></a>');
    var facilityMatch = 0;
    $.each(vScoutBase, function (index, value) {
      if (index == currentFacility) {
        facilityMatch = 1;
      }
    });
    if (facilityMatch == 1) {
      var signature = $(current).parent().find('cite').html() + '';
      var vScoutAppend = ' <a href="' + vScoutBase[currentFacility] + encodeURIComponent(signature) + '" target="_blank"><img src="http://ilu.zhbluzern.ch' + proxySuffix + '/local/primo/plan_symbol.jpg" border="0" title="Lageplan anzeigen" /></a>';
      $(current).parent().find('cite').append(vScoutAppend);
    }
  });
}
$.addBibInfoToLocationsFullscreen = function (result) {
  var locationCnt = 0;
  $(result).find('.EXLContainer-locationsTab').ready(function () {
    container = $(result).find('.EXLContainer-locationsTab');
    if (!$(container).find('.injectedFacility').length) {
      $.addBibInfoInjector(container);
    }
  });
}
$.addSFXLinksToDetailFullscreen = function (result, sfxURL) {
  $(result).ready(function () {
    container = $(document).find('.EXLTabContent.EXLDetailsTabContent').find('.EXLDetailsContent');
    if ($(container).html() == undefined) {
      $.addSFXLinksToDetailTab(result, sfxURL, 1);
      return;
    }
    $.addSFXLinksToDetail(result, sfxURL, container);
  });
}
$.addSFXLinksToDetailTab = function (result, sfxURL, fromFullscreen) {
  if (fromFullscreen == undefined) fromFullscreen = 0;
  var sfxLinksLookupStatus = 0;
  $(result).find('.EXLDetailsTab a').click(function () {
    if (fromFullscreen == 0) {
      container = $(result).parent().parent().parent().parent().parent().find('.EXLResultTabContainer.EXLContainer-detailsTab');
      $(container.ajaxComplete(function () {
        if (sfxLinksLookupStatus != 0) return;
        sfxLinksLookupStatus = 1;
        $.addSFXLinksToDetail(result, sfxURL, container);
        sfxLinksLookupStatus = 2;
      }));
    } else {
      container = $(document).find('.EXLResultTabContainer.EXLContainer-detailsTab');
      $(container.ajaxComplete(function () {
        if (sfxLinksLookupStatus != 0) return;
        sfxLinksLookupStatus = 1;
        $.addSFXLinksToDetail(result, sfxURL, container);
        sfxLinksLookupStatus = 2;
      }));
    }
  });
}
$.addSFXLinksToDetail = function (result, sfxURL, container) {
  if ($(result).find('.SFXLinks').html() != undefined) return;
  var SFXBox = $('<div class="EXLDetailsLinks SFXLinks" style="margin-bottom: 0px;"></div>');
  SFXBox.append('<em>Weitere Services</em>');
  SFXBox.append('<ul class="SFXLinksList"></ul>');
  var newItems = '';
  var allFacilities = new Array();
  $.ajax({
    async: false,
    url: lookUpURL,
    dataType: 'json',
    data: 'type=targets&sourceURL=' + encodeURIComponent(sfxURL) + '&proxySuffix=' + encodeURIComponent(proxySuffix),
    success: function (json2) {
      var lastFacility = '';
      for (var number2 in json2) {
        if (json2[number2]['facility'] == undefined) continue;
        if (lastFacility != json2[number2]['facility']) {
          allFacilities.push(json2[number2]['facility']);
        }
        lastFacility = json2[number2]['facility'];
      }
    }
  });
  $.ajax({
    async: false,
    url: lookUpURL,
    dataType: 'json',
    data: 'type=sfxLinks&sourceURL=' + encodeURIComponent(sfxURL) + '&proxySuffix=' + encodeURIComponent(proxySuffix) + '&noProxy=1',
    success: function (json) {
      console.log(json);
      for (var number in json) {
        sfxLinksLookupStatus = 1;
        if (json[number]['facility'] == undefined) continue;
        console.log(json[number]);
        console.log(json[number]['facility']);
        console.log(allFacilities);
        if ($.inArray(json[number]['facility'], allFacilities) == - 1) continue;
        newItems = newItems + '<li><span class="EXLDetailsLinksBullet"></span><span class="EXLDetailsLinksTitle"><a href="' + json[number]['sfxLink'] + '">' + json[number]['facility'] + '</a></span></li>';
      }
    },
    error: function (json) {
      console.log(json);
    }
  });
  SFXBox.find('ul').append(newItems);
  $(SFXBox).insertAfter($(result).find('.EXLDetailsContent'));
  console.log('inserted!');
}
$.facilityInfo = function (event, source, url) {
  return;
  if ($(source).find('.LibQuickInfoOuter').length == 1) {
    return;
  }
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
  $(source).hover(function () {
    $(this).css('text-decoration', 'none')
  });
  var layer = '<div class="LibQuickInfoOuter" style="display: none; font-weight: normal; position:relative; overflow:hidden; text-align:left; z-index: 200; border: #000 1px solid; background-color: #fff; max-width: 80%; padding: 10px;"></div>';
  var layerCloseLink = '<div class="LibQuickInfoCloseLink" style="position: relative; float: right; right: 2px; top: 2px;"><a onclick="$.closeFacilityInfo(event, this)">[X]</a></div>';
  var layerContent = '<div class="LibQuickInfo" style="position: relative; float: left;">Bitte warten...</div>';
  $(source).css('position', 'absolute');
  $(layer).appendTo($(source));
  $(layerCloseLink).appendTo($(source).find('.LibQuickInfoOuter'));
  $(layerContent).appendTo($(source).find('.LibQuickInfoOuter'));
  $(source).find('.LibQuickInfoOuter').css('display', 'block');
  console.log(lookUpURL + '?type=getLibInfo&sourceURL=' + encodeURIComponent(url));
  $(source).find('.LibQuickInfo').load(lookUpURL + '?type=getLibInfo&sourceURL=' + encodeURIComponent(url));
}
$.closeFacilityInfo = function (event, element) {
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
  var source = $(element).parent().parent().parent();
  $(source).css('position', 'relative');
  $(source).find('.LibQuickInfoOuter').remove();
}
