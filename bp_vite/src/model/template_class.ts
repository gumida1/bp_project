import template_sizes from "./template_sizes_class";

export default class template_info {
    id_templatu : number;
    template_type : template_sizes;
    image : string = '';
    text : string = '';
    from_top: string;
    from_left: string = '32mm';

    constructor(id : number, t_t : template_sizes, from_top : string) {
        this.id_templatu = id
        this.template_type = t_t
        this.from_top = from_top
        //this.from_left = from_left
    }
}