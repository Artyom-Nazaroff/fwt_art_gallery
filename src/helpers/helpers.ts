import queryString from 'query-string';
import { createBrowserHistory } from 'history';
import { Dispatch } from 'redux';
import { QueryType } from '../types/types';
import { ArtistsAction } from '../store/artists/artistsTypes';

type ParsedStringTypes = {
  setSearchName: (val: string) => void;
  setSelectedGenres: (val: string[]) => void;
  setPerPage: (val: number) => void;
  setPage: (val: number) => void;
  setOrderBy: (val: 'asc' | 'desc' | null) => void;
};

type QueryStringTypes = {
  searchName: string;
  selectedGenres: string[];
  perPage: number;
  page: number;
  orderBy: 'asc' | 'desc' | null;
};

export const getParsedQueryString = ({
  setSearchName,
  setSelectedGenres,
  setPerPage,
  setPage,
  setOrderBy,
}: ParsedStringTypes) => {
  const parsed = queryString.parse(createBrowserHistory().location.search) as QueryType;
  const actualFilter: QueryType = {};
  if (parsed.name) {
    actualFilter.name = parsed.name;
    setSearchName(actualFilter.name);
  }
  if (parsed.genres && parsed.genres?.length !== 0) {
    actualFilter.genres = parsed.genres;
    setSelectedGenres([...parsed.genres]);
  }
  if (parsed.perPage) {
    actualFilter.perPage = parsed.perPage;
    setPerPage(parsed.perPage);
  }
  if (parsed.pageNumber) {
    actualFilter.pageNumber = +parsed.pageNumber;
    setPage(+parsed.pageNumber);
  }
  if (parsed.orderBy) {
    actualFilter.orderBy = parsed.orderBy;
    setOrderBy(parsed.orderBy);
  }
  return actualFilter;
};

export const setQueryStringParams = ({
  searchName,
  selectedGenres,
  perPage,
  page,
  orderBy,
}: QueryStringTypes) => {
  const query = {} as QueryType;
  if (searchName) query.name = searchName;
  if (selectedGenres.length !== 0) query.genres = selectedGenres;
  if (perPage) query.perPage = perPage;
  if (page) query.pageNumber = page;
  if (orderBy) query.orderBy = orderBy;
  createBrowserHistory().push({
    pathname: '/new_art_gallery',
    search: queryString.stringify(query),
  });
};

export const showToast = (
  func: (val: string) => (dispatch: Dispatch<ArtistsAction>) => void,
  message: string
) => {
  func(message);
  setTimeout(() => {
    func('');
  }, 4000);
};
