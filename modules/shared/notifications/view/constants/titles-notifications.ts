import { JobsNotificationsType } from "../../domain/enums/jobs-notifications"

export const SUCCESS_TITLES: Record<JobsNotificationsType, string> = {
    [JobsNotificationsType.IMAGE]:                'The image was created successfully.',
    [JobsNotificationsType.VIDEO]:                'The video was created successfully.',
    [JobsNotificationsType.AUDIO]:                'The audio was created successfully.',
    [JobsNotificationsType.TEXT]:                 'The text was created successfully.',
    [JobsNotificationsType.IMAGE_REMIX]:          'The image remix was created successfully.',
    [JobsNotificationsType.INFLUENCER]:           'The influencer was created successfully.',
    [JobsNotificationsType.INFLUENCER_SNAPSHOT]:  'The snapshot was created successfully.',
    [JobsNotificationsType.INFLUENCER_SCENE]:     'The scene was created successfully.',
}

export const ERROR_TITLES: Record<JobsNotificationsType, string> = {
    [JobsNotificationsType.IMAGE]:                'Error generating image.',
    [JobsNotificationsType.VIDEO]:                'Error generating video.',
    [JobsNotificationsType.AUDIO]:                'Error generating audio.',
    [JobsNotificationsType.TEXT]:                 'Error generating text.',
    [JobsNotificationsType.IMAGE_REMIX]:          'Error generating image remix.',
    [JobsNotificationsType.INFLUENCER]:           'Error generating influencer.',
    [JobsNotificationsType.INFLUENCER_SNAPSHOT]:  'Error generating snapshot.',
    [JobsNotificationsType.INFLUENCER_SCENE]:     'Error generating scene.',
}