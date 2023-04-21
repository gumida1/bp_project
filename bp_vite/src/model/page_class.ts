import template_info from "./template_class";
import space_info from "./space_class";

export default class page_info {
    c_stranky: number;
    templates_on_page : template_info[] = [];
    filled: space_info[] = []

    constructor(c_s: number) {
        this.c_stranky = c_s;
    }
}
