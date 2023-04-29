export const genreEndpoints = {
  list: (mediaType: string) => `/genre/${mediaType}/list`,
};

export const mediaEndpoints = {
  list: (mediaType: string, mediaCategory: string, page: number) =>
    `/${mediaType}/${mediaCategory}?page=${page}`,
  detail: (mediaType: string, mediaId: string) =>
    `/${mediaType}/detail/${mediaId}`,
  search: (mediaType: string, q: string, page: number) =>
    `/${mediaType}?query=${q}&page=${page}`,
};
