export const queryKeys = {
    bookDetail : ['bookDetail'] as const,
    bookId : (isbn : string) => [...queryKeys.bookDetail, isbn],
}