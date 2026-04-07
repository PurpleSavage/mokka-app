import { Mockups3DError } from "../../infrastructure/errors/mockups-3d.error"
import { LocalBdErrors } from "../enums/local-bd-errors"

export class MockupCreatedVO{
    constructor(
        public readonly localUpdatedAt: Date,
        public readonly decalFile:File,
        public readonly lastUpdatedAt:Date,
        public readonly modelId:string,
        public readonly backgroundColor:string,
        public readonly color:string,
    ){}
    static fileIsNull(file:File | null){
        if(!file) {
            throw new Mockups3DError({
                message:'file is not valid',
                errorType: LocalBdErrors.FILE_NOT_VALID,
                status: 400,
                details: 'There is no file or image to save this mockup.',
            })
        }
        return file
    }
    static modelIdIsNull(id:string){
        if(!id){
            throw new Mockups3DError({
                message:'No model has been selected.',
                errorType: LocalBdErrors.FIELD_NOT_VALID,
                status: 400,
                details: 'You need to select a model in order to save this mockup locally.',
            })
        }
        return id
    }
    static createVO(props:{
        localUpdatedAt: Date,
        decalFile:File | null,
        lastUpdatedAt:Date,
        modelId:string,
        backgroundColor:string,
        color:string,
    }){
        const fileValidated = MockupCreatedVO.fileIsNull(props.decalFile)
        const idvalidated = MockupCreatedVO.modelIdIsNull(props.modelId)
        return new MockupCreatedVO(
            props.localUpdatedAt,
            fileValidated,
            props.lastUpdatedAt,
            idvalidated,
            props.backgroundColor,
            props.color
        )
    }
}