export class Config {
  public url: string;
  public urlSpecific: string;
  public urlLanguages: string;
  public urlTranslations: string;
  public urlItems: string;
  public urlLogin: string;
  public urlStatistics: string;
  public urlCustomers: string;
  public urlProspects: string;
  constructor() {
  }

  setValue(item: any) {
    this.url = item.url;
    this.urlSpecific = item.urlSpecific;
    this.urlLanguages = item.urlLanguages;
    this.urlTranslations = item.urlTranslations;
    this.urlItems = item.urlItems;
    this.urlLogin = item.urlLogin;
    this.urlStatistics = item.urlStatistics;
    this.urlCustomers = item.urlCustomers;
    this.urlProspects = item.urlProspects;
  };

  getUrlSpecific() {
    return this.urlSpecific;
  }

  getUrl() {
    return this.url;
  }

  getUrlLanguages() {
    return this.urlLanguages;
  }

  getUrlTranslations() {
    return this.urlTranslations;
  }

  getUrlItems() {
    return this.urlItems;
  }

  getUrlLogin() {
    return this.urlLogin;
  }

  getUrlStatistics() {
    return this.urlStatistics;
  }

  getUrlCustomers() {
    return this.urlCustomers;
  }

  getUrlProspects() {
    return this.urlProspects;
  }

}
