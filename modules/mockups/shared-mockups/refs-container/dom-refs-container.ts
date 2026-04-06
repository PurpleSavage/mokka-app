export class DomRefsContainer{
    private canvasRef: HTMLCanvasElement | null = null
    setCanvasRef(ref: HTMLCanvasElement){
        this.canvasRef=ref
    }
    getCanvasRef(): HTMLCanvasElement | null{
        return this.canvasRef
    }
}


export const domRefs = new DomRefsContainer()