export interface ModalWrapperConfig{
    title:string,
    isVisible:boolean,
    modalId: string | null
    formType?: 'SCENE' | 'SNAPSHOT' |'INFLUENCER'| null;
}