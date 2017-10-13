export class FormList {
    public title: string;
    public endPoint: string;
    public linkRoute: string;
    public selectedDate: number;
    public selectedRow: number;
    public perPage: number;
    public offset: number;
    public totalPagesVisible: number;
    constructor() {
        this.title = 'Files';
        this.endPoint = 'files';
        this.linkRoute = 'files';
        this.selectedDate = 2;
        this.selectedRow = 3;
        this.perPage = 20;
        this.offset = 20;
        this.totalPagesVisible = 7;
    }
}
