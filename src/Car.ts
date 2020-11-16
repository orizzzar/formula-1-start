class Car {

    static carsAmount: number = 0;

    private image: HTMLImageElement;
    private name: string;
    private distance: number = 0;
    private xInitialPosition: number;
    private yPosition: number;

    constructor(name: string, imagePath: string) {
        Car.carsAmount += 1;

        this.name = name;

        this.image = this.loadNewImage(imagePath);
        this.xInitialPosition = 50;
        this.yPosition = 200 + (Car.carsAmount - 1) * 280;
    }

    public setDistance(distance: number) {
        this.distance = distance 
    }

    public getDistance(): number {
        return this.distance;
    }

    private getxPosition(): number {
        return this.xInitialPosition + this.distance;
    }

    public getyPosition(): number {
        return this.yPosition;
    }

    public getName(): string {
        return this.name;
    }

    
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.filter = "drop-shadow(4px 4px 5px rgba(0, 0, 0, 0.2)"
        ctx.drawImage(this.image, this.getxPosition(), this.getyPosition());
        ctx.filter = "none;"
    }

    /**
    * Method to load an image
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }
}