import linksHMTL from './links.html'

class LinksController {
  constructor() {
    let self = this;
  
    Primo.user.then(user => {
      self.isOnCampus = user.isOnCampus();
      self.isLoggedIn = user.isLoggedIn();
      self.allFines =  {
        count: user.fines.length,
        sum: (user.fines ? user.fines.map(f => parseFloat(f.finesum)).reduce((p,c)=> p+c, 0) : 0)
      }
    });
  }

  get onCampus() {
    return this.isOnCampus;
  }

  get loggedIn() {
    return this.isLoggedIn;
  }

  get fines() {
    return this.allFines;
  }

  get linkClass() {
    return this.class || '';
  }

  get linkText() {
    return this.text || '';
  }

  get linkUrl() {
    return this.url || '';
  }
}

export let linksConfig = {
  bindings: {
    class: '@',
    text: '@',
    url: '@'
  },
  controller: LinksController,
  template: linksHMTL
}
