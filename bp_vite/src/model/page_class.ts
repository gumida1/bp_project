export default class page_info {
    c_stranky: number;
    teplates_on_single_page: string[] = [];
    images_on_single_page: string[] = [];

    constructor(c_s: number) {
        this.c_stranky = c_s;
    }
}
