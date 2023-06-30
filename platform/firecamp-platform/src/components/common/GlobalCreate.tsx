import { useState } from 'react';
import classnames from 'classnames';

import { RiBracesLine } from '@react-icons/all-files/ri/RiBracesLine';
import { VscArrowDown } from '@react-icons/all-files/vsc/VscArrowDown';
import { VscFolder } from '@react-icons/all-files/vsc/VscFolder';
import { VscOrganization } from '@react-icons/all-files/vsc/VscOrganization';
import { AiOutlineUserAdd } from '@react-icons/all-files/ai/AiOutlineUserAdd';
import { AiOutlineUserSwitch } from '@react-icons/all-files/ai/AiOutlineUserSwitch';
import { VscMultipleWindows } from '@react-icons/all-files/vsc/VscMultipleWindows';
import { VscWindow } from '@react-icons/all-files/vsc/VscWindow';

import { Button, DropdownMenu, FcIconGetSquare } from '@firecamp/ui';
import platformContext from '../../services/platform-context';
import { useWorkspaceStore } from '../../store/workspace';
import { useTabStore } from '../../store/tab';
import { ETabEntityTypes } from '../tabs/types';

enum EMenuOptions {
  Request = 'request',
  Collection = 'collection',
  Environment = 'environment',
  ImportCollection = 'import-collection',
  Workspace = 'workspace',
  Organization = 'organization',
  InviteMembers = 'invite-members',
  SwitchOrg = 'switch-org',
  SwitchWorkspace = 'switch-workspace',
}

const options = [
  {
    id: EMenuOptions.Request,
    name: 'New Request',
    prefix: () => <FcIconGetSquare size={18} />,
  },
  {
    id: EMenuOptions.Collection,
    name: 'New Collection',
    prefix: () => <VscFolder size={18} />,
  },
  {
    id: EMenuOptions.Environment,
    name: 'New Environment',
    prefix: () => <RiBracesLine size={18} />,
  },

  {
    id: EMenuOptions.ImportCollection,
    name: 'Import Collection',
    showSeparator: true,
    prefix: () => <VscArrowDown size={18} />,
  },
  {
    id: EMenuOptions.Workspace,
    name: 'New Workspace',
    prefix: () => <VscWindow size={18} />,
  },
  {
    id: EMenuOptions.Organization,
    name: 'New Organization',
    prefix: () => <VscOrganization size={18} />,
  },
  {
    id: EMenuOptions.InviteMembers,
    name: 'Invite Members',
    showSeparator: true,
    prefix: () => <AiOutlineUserAdd size={18} />,
  },
  {
    id: EMenuOptions.SwitchOrg,
    name: 'Switch Organization',
    prefix: () => <AiOutlineUserSwitch size={18} />,
  },
  {
    id: EMenuOptions.SwitchWorkspace,
    name: 'Switch Workspace',
    prefix: () => <VscMultipleWindows size={18} />,
  },
];

const GlobalCreateDD = ({}) => {
  const [isOpen, toggleOpen] = useState(false);
  const { open } = useTabStore.getState();
  const onSelect = (option) => {
    switch (option.id) {
      case EMenuOptions.Request:
        open({}, { id: '', type: ETabEntityTypes.Request });
        break;
      case EMenuOptions.Collection:
        platformContext.platform.createCollectionPrompt();
        break;
      case EMenuOptions.Environment:
        platformContext.platform.createEnvironmentPrompt();
        break;
      case EMenuOptions.ImportCollection:
        const { openImportTab } = useWorkspaceStore.getState();
        openImportTab();
        break;
      case EMenuOptions.Workspace:
        platformContext.platform.createWorkspacePrompt();
        break;
      case EMenuOptions.Organization:
        platformContext.platform.createOrganizationPrompt();
        break;
      case EMenuOptions.InviteMembers:
        platformContext.app.modals.openInviteMembers();
        break;
      case EMenuOptions.SwitchOrg:
        platformContext.app.modals.openSwitchOrg();
        break;
      case EMenuOptions.SwitchWorkspace:
        platformContext.app.modals.openSwitchWorkspace();
        break;
    }
  };

  return (
    <div className="border-l border-b border-tab-border flex items-center pl-1">
      <DropdownMenu
        onOpenChange={(v) => toggleOpen(v)}
        handleRenderer={() => (
          <Button
            text={'Create'}
            className={classnames({ open: isOpen })}
            primary
            withCaret
            transparent
            ghost
            xs
          />
        )}
        options={options}
        onSelect={onSelect}
        classNames={{
          dropdown: '-ml-[2px]',
        }}
      />
    </div>
  );
};
export default GlobalCreateDD;
