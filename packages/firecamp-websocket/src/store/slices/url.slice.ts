import { IUrl, IQueryParam } from '@firecamp/types';

interface IUrlSlice {
  changeUrl: (urlObj: any) => void;
  changeQueryParams: (queryParams: IQueryParam[]) => void;
}

const getPathFromUrl = (url: string) => {
  return url.split(/[?#]/)[0];
};

const createUrlSlice = (set, get): IUrlSlice => ({
  changeUrl: (urlObj: IUrl) => {
    const state = get();
    const url = { ...state.request.url, raw: getPathFromUrl(urlObj.raw) };

    set((s) => {
      const { activePlayground } = s.runtime;
      const connections = s.request.connections.map((c) => {
        if (c.id == activePlayground) {
          c.queryParams = urlObj.queryParams;
        }
        return c;
      });
      return {
        ...s,
        request: { ...s.request, url, connections },
        runtime: { ...s.runtime, displayUrl: urlObj.raw },
      };
    });
    state.equalityChecker(url);
  },
  changeQueryParams: (queryParams: IQueryParam[]) => {
    set((s) => ({
      request: {
        ...s.request,
        url: { ...s.request.url, queryParams },
      },

      // manage ui state
      ui: {
        ...s.ui,
        requestPanel: {
          ...s.ui.requestPanel,
          hasParams: queryParams.length !== 0,
        },
      },
    }));
  },
});

export { createUrlSlice, IUrlSlice };
