import { ISocketIO, TId } from '@firecamp/types';
import {
  IUrlSlice,
  createUrlSlice,
  IConnectionsSlice,
  createConnectionSlice,
} from '.';
import { normalizeRequest } from '../../services/request.service';

interface IRequestSlice extends IUrlSlice, IConnectionsSlice {
  request: ISocketIO;
  changeListeners: (listeners: Array<string>) => void;
  changeMeta: (key: string, value: any) => void;
  changeConfig: (key: string, value: any) => void;
  save: (tabId: TId) => void;
}

const requestSliceKeys = ['url', 'connections', 'config', '__meta', '__ref'];

const createRequestSlice = (
  set,
  get,
  initialRequest: ISocketIO
): IRequestSlice => ({
  request: initialRequest,

  //url
  ...createUrlSlice(set, get),
  ...createConnectionSlice(set, get),

  changeListeners: (listeners: Array<string>) => {
    const state = get();
    set((s) => ({
      request: {
        ...s.request,
        listeners,
      },
    }));
    // update config
    state.changeMeta('onConnectListeners', listeners);
    // state.equalityChecker({ listeners });
  },

  changeMeta: (key: string, value: any) => {
    const state = get();
    const __meta = {
      ...(state.request.__meta || {}),
      [key]: value,
    };
    set((s) => ({
      request: { ...s.request, __meta },
    }));
    state.equalityChecker({ __meta });
  },
  changeConfig: (key: string, value: any) => {
    const state = get();
    const config = {
      ...(state.request.config || {}),
      [key]: value,
    };
    set((s) => ({ request: { ...s.request, config } }));
    state.equalityChecker({ config });
  },
  save: (tabId) => {
    const state = get();
    const {
      request,
      runtime: { isRequestSaved },
    } = state;
    if (!isRequestSaved) {
      const _request = normalizeRequest(request);
      state.context.request.save(_request, tabId);
    }
  },
});

export { IRequestSlice, createRequestSlice, requestSliceKeys };
