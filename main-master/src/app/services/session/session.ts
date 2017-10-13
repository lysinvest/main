export class Session {
  public name: string;
  public firstName: string;
  public password: string;
  public email: string;
  public language: string;
  public connected: boolean;
  public translated: boolean;

  constructor() {
    this.connected = false;
    this.translated = false;
  }

  setValue(item: any) {
    this.name = item.name;
    this.firstName = item.firstName;
    this.password = item.password;
    this.email = item.email;
    this.language = null;
    this.connected = false;
    this.translated = false;
    if (item.connected !== undefined) {
      this.connected = item.connected;
    }
  };

  setConnected(connected: boolean) {
    this.connected = connected;
  }

  getConnected() {
    return this.connected;
  }

}
