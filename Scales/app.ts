class Scales {
    products: Product[] = [];

    add(obj: Product): void {
        this.products.push(obj);
    }
    getSumScale(): number {

        let sumScale: number = 0;
        this.products.forEach(prod => {
            sumScale += prod.getScale();
        })
        return sumScale;
    }
    getNameList(): string[] {
        let prodNames: string[] = [];
        this.products.forEach(prod => {
            prodNames.push(prod.getName())
        })
        return prodNames;
    }
}

class Product {
    scale: number;
    name: string;

    getScale(): number {
        return this.scale;
    }
    getName(): string {
        return this.name;
    }
}

class Apple extends Product {

    constructor(_name: string, _scale: number) {
        super()
        this.scale = _scale;
        this.name = _name;
    }
}

class Tomato extends Product {

    constructor(_name: string, _scale: number) {
        super()
        this.scale = _scale;
        this.name = _name;
    }
}

let myScales = new Scales();

let prod1 = new Tomato('RedTomato', 49);
let prod2 = new Apple('RedApple', 51);
let prod3 = new Apple('SmallApple', 22);
let prod4 = new Tomato('SmallTomato', 20);

myScales.add(prod1);
myScales.add(prod2);
myScales.add(prod3);
myScales.add(prod4);

console.log(myScales.getNameList());
console.log(myScales.getSumScale());




