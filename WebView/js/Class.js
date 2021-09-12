class Thoughts{
    constructor(text){
        this.text = text;
        this.time = new Date().getTime();
        // this.day = new Date().getUTCDay();
    }
}
// let thoughts1 = new Thoughts("今天规范开发的你,不会给以后开发的你使绊子!");
// console.log(thoughts1);