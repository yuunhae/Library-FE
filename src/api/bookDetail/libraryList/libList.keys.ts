export const queryKeys = {
    liblist: ['Library'] as const,
    libraryId : (libcode:string) => [...queryKeys.liblist, libcode]

}