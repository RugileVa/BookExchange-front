/**
 * API
 * Oauth2-secured API
 *
 * The version of the OpenAPI document: v1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface ViewAdvertDTO { 
    date?: string;
    tag?: ViewAdvertDTO.TagEnum;
    title?: string;
    author?: string;
    genre?: string;
    description?: string;
    advertImage?: Array<string>;
    username?: string;
    phoneNumber?: string;
    email?: string;
}
export namespace ViewAdvertDTO {
    export type TagEnum = 'BUY' | 'SELL' | 'EXCHANGE' | 'FOR_FREE';
    export const TagEnum = {
        Buy: 'BUY' as TagEnum,
        Sell: 'SELL' as TagEnum,
        Exchange: 'EXCHANGE' as TagEnum,
        ForFree: 'FOR_FREE' as TagEnum
    };
}


