export const queryKeys = {
    liblist: ['Library'] as const,
    libraryId : (libcode:string, region?: string) => [...queryKeys.liblist, libcode, region]

}