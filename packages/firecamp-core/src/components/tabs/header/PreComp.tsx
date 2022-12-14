import classNames from 'classnames';
import { EHttpMethod, ERequestTypes } from '@firecamp/types';
import {
  FcIconGraphQL,
  FcIconSocketIoSquare,
  FcIconWebSocket,
} from '@firecamp/ui-kit';

const PreComp = ({ method = '', type = '' }) => {
  switch (type) {
    case ERequestTypes.Rest:
      if (!method) method = EHttpMethod.GET;
      return (
        <div
          className={classNames(
            { '': method === EHttpMethod.GET },
            `${method} text-xs font-bold`
          )}
        >
          {method}
        </div>
      );
    case ERequestTypes.GraphQL:
      return (
        <div className="GRAPHQL text-xs font-bold w-5">
          <FcIconGraphQL size={20} />
        </div>
      );
    case ERequestTypes.SocketIO:
      return (
        <div className="SOCKETIO text-xs font-bold w-5 invert">
          <FcIconSocketIoSquare size={24} />
        </div>
      );
    case ERequestTypes.WebSocket:
      return (
        <div className="WEBSOCKET text-xs font-bold w-5 invert">
          <FcIconWebSocket size={24} />
        </div>
      );
    default:
      return <span />;
  }
};

export default PreComp;
