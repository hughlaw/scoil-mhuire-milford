export default {
  name: 'policiesPage',
  title: 'Policies',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      hidden: true,
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
      name: 'introduction',
      title: 'Introduction',
      type: 'sm-block',
    },
    {
      name: 'policies',
      type: 'array',
      of: [{ type: 'policy' }],
    },
  ],
  initialValue: {
    title: 'Policies',
  },
};
