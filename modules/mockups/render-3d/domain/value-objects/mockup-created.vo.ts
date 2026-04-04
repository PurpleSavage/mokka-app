export class MockupCreatedVO{
    constructor(
        public readonly localUpdatedAt: Date,
        public readonly decalFile:string,
        public readonly lastUpdatedAt:Date,
        public readonly modelId:string,
        public readonly backgroundColor:string,
        public readonly color:string,
    ){}
    static createVO(props:{
        localUpdatedAt: Date,
        decalFile:string,
        lastUpdatedAt:Date,
        modelId:string,
        backgroundColor:string,
        color:string,
    }){
        return new MockupCreatedVO(
            props.localUpdatedAt,
            props.decalFile,
            props.lastUpdatedAt,
            props.modelId,
            props.backgroundColor,
            props.color
        )
    }
}