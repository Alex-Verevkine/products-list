export interface EnumObject {
    [enumValue: number]: string;
}

export const enumToStrArray = (e: EnumObject): string[] => Object.keys(e)
    .filter(i => !isNaN(+i))
    .map(i => e[i]);
