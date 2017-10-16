export class Link {
    public active: Boolean = false;
    public title: String = '';
    public url: Array<String> = [];

    constructor(url: Array<String>, title: String, active?: Boolean) {
        this.title = title;
        this.url = url;
        this.active = active;
    }
}
