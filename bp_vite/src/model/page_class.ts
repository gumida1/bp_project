import template_info from "./template_class";
import space_info from "./space_class";

export default class page_info {
    c_stranky: number;
    teplates_on_single_page: string[] = [];
    templates_on_page : template_info[] = [];
    images_on_single_page: string[] = [];
    text_on_single_page: string = '';

    filled: space_info[] = []

    constructor(c_s: number) {
        this.c_stranky = c_s;
    }
}
