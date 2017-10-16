export class Message {

  public action: string;
  public parent: string;

  constructor() {
  }

  public setAction(action: string) {
    this.action = action;
  }

/*  public getAction() {
    return this.action;
  }*/

  public setParent(parent: string) {
    this.parent = parent;
  }

/*  public getParent() {
    return this.parent;
  }*/

}

