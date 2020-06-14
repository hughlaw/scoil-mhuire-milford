export default {
  name: 'navigation',
  title: 'Main navigation',
  description:
    'Use this to build up your main navigation. The "News", "Events" and "Classes" links are automatically added for you. Drag and drop to reorder.',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'page' }, { type: 'aboutPage' }, { type: 'policiesPage' }],
    },
  ],
};
