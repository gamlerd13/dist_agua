export interface LocationMain{
    id?: number,
    name: string,
    distritoId: number,
}

export type LocationPost = Omit<LocationMain, 'id'>
export type Location = Required<LocationMain>

export interface LocationDistrict{
    id: number,
    name: string,
    distrito: string,
}