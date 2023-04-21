export default class space_info {
    left : boolean
    right : boolean

    start_pos : number
    end_pos : number

    constructor(left: boolean, right: boolean, start_pos: number, end_pos: number) {
        this.left = left;
        this.right = right;
        this.start_pos = start_pos;
        this.end_pos = end_pos;
    }



}