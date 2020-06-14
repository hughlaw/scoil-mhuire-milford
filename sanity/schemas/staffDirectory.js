import { FiUser } from 'react-icons/fi';

export default {
  name: 'staffDirectory',
  title: 'Staff members',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  icon: FiUser,
  type: 'document',
  fields: [
    {
      name: 'staffMembers',
      title: 'Staff members',
      description:
        'This determines which staff members are shown within the "About the school" page. A staff member must be added using the "Create before they can be included here.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'staffMember' }] }],
    },
  ],
};
