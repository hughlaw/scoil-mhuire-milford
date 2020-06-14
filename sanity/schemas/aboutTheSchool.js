export default {
  title: 'About the school',
  name: 'aboutPage',
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
      name: 'staffIntro',
      title: 'Staff introduction',
      description: 'Displays some text before listing each staff member',
      type: 'text',
    },
    {
      name: 'pagecontent',
      title: 'Page content',
      type: 'sm-block',
    },
  ],
  initialValue: {
    title: 'About the school',
  },
};
