import { FiFileText } from 'react-icons/fi';

export default {
  name: 'policy',
  title: 'Policy',
  icon: FiFileText,
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Policy name',
      type: 'string',
    },
    {
      name: 'description',
      description: 'Give a short description on what this policy is about',
      type: 'text',
    },
    {
      name: 'policyDocument',
      title: 'Policy document',
      type: 'file',
      options: {
        accept: '.pdf, .doc, .docx',
        storeOriginalFilename: true,
      },
    },
  ],
};
