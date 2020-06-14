import { FiFileText } from 'react-icons/fi';

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: FiFileText,
  fields: [
    {
      name: 'title',
      title: 'Page title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Page URL',
      description:
        'A slug is a generated string of text used to create unique URL for this page',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
      },
    },
    {
      name: 'pageContent',
      title: 'Page content',
      type: 'sm-block',
      validation: Rule => Rule.required(),
    },
  ],
};
