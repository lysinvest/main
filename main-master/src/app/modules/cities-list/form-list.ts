export class FormList {
    public title: string;
    public endPoint: string;
    public linkRoute: string;
    public selectedDate: number;
    public selectedRow: number;
    public perPage: number;
    public offset: number;
    public totalPagesVisible: number;
    public positionDisplayed: boolean;
    public numberDisplayed: boolean;
    public paginationDisplayed: boolean;
    constructor() {
        this.title = 'Cities';
        this.endPoint = 'cities';
        this.linkRoute = 'cities';
        this.selectedDate = 2;
        this.selectedRow = 3;
        this.perPage = 20;
        this.offset = 20;
        this.totalPagesVisible = 7;
        this.positionDisplayed = true;
        this.numberDisplayed = true;
        this.paginationDisplayed = true;
    }
}
