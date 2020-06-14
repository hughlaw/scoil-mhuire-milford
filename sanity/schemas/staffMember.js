import { FiUser } from 'react-icons/fi';

export default {
  name: 'staffMember',
  title: 'Staff member',
  icon: FiUser,
  type: 'document',
  // __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'jobTitle',
      title: 'Job title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'profilePic',
      title: 'Profile picture',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
  ],
};
