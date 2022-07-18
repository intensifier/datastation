import * as React from 'react';
import { DatabaseConnectorInfo, ServerInfo } from '../../shared/state';
import { FormGroup } from '../components/FormGroup';
import { Input } from '../components/Input';
import { ServerPicker } from '../components/ServerPicker';
import { Toggle } from '../components/Toggle';
import { Database } from './Database';
import { Host } from './Host';
import { Password } from './Password';
import { Username } from './Username';

export function ODBCDetails(props: {
  connector: DatabaseConnectorInfo;
  updateConnector: (c: DatabaseConnectorInfo) => void;
  servers: Array<ServerInfo>;
}) {
  const { servers, connector, updateConnector } = props;

  return (
    <React.Fragment>
      <FormGroup>
        <Host connector={connector} updateConnector={updateConnector} />
        <Username {...props} />
        <Password {...props} />
        <Database
          label="Database"
          connector={connector}
          updateConnector={updateConnector}
        />
        <div className="form-row">
          <Input
            label="Additional parameters"
            value={connector.database.extra.driver || ''}
            onChange={(value: string) => {
              connector.database.extra.driver = value;
              updateConnector(connector);
            }}
            placeholder="Driver specified in DSN"
          />
        </div>
        <div className="form-row">
          <Toggle
            label="Untrusted certificates"
            rhsLabel={
              String(connector.database.extra.odbc_allow_untrusted) === 'true'
                ? 'Allowed'
                : 'Not allowed'
            }
            value={
              String(connector.database.extra.odbc_allow_untrusted) === 'true'
            }
            onChange={function handleTrustToggle() {
              connector.database.extra.odbc_allow_untrusted = String(
                !(connector.database.extra.odbc_allow_untrusted === 'true')
              );
              updateConnector(connector);
            }}
          />
        </div>
      </FormGroup>
      <ServerPicker
        servers={servers}
        serverId={connector.serverId}
        onChange={(serverId: string) => {
          connector.serverId = serverId;
          updateConnector(connector);
        }}
      />
    </React.Fragment>
  );
}
