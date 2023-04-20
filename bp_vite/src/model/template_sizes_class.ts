export default class template_sizes {
    height : number
    width : number
    columns : number
    has_text : boolean
    constructor(height : number, width : number, cols : number, h_t : boolean) {
        this.height = height
        this.width = width
        this.columns = cols
        this.has_text = h_t
    }
}