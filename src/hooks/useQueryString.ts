import { useEffect } from 'react';
import queryString from 'query-string';
import { createBrowserHistory } from 'history';
import { QueryType } from '../types/types';

type QueryStringProps = {
  searchName: string;
  selectedGenres: Array<string>;
  perPage: number;
  page: number;
  setSearchName: (val: string) => void;
  setSelectedGenres: (val: string[]) => void;
  setPerPage: (val: number) => void;
  setPage: (val: number) => void;
};

export const useQueryString = ({
  searchName,
  selectedGenres,
  perPage,
  page,
  setSearchName,
  setSelectedGenres,
  setPerPage,
  setPage,
}: QueryStringProps) => {
  useEffect(() => {
    const parsed = queryString.parse(createBrowserHistory().location.search) as QueryType;
    if (parsed.name) setSearchName(parsed.name);
    if (parsed.genres && parsed.genres?.length !== 0) setSelectedGenres(parsed.genres);
    if (parsed.perPage) setPerPage(+parsed.perPage);
    if (parsed.pageNumber) setPage(+parsed.pageNumber);
  }, []);

  useEffect(() => {
    const query = {} as QueryType;
    if (searchName) query.name = searchName;
    if (selectedGenres.length !== 0) query.genres = selectedGenres;
    if (perPage) query.perPage = perPage;
    if (page) query.pageNumber = page;
    createBrowserHistory().push({
      pathname: '/new_art_gallery',
      search: queryString.stringify(query),
    });
  }, [searchName, selectedGenres, perPage, page]);
};
