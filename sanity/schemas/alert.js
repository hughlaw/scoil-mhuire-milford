export default {
  name: 'alert',
  title: 'Alert',
  type: 'object',
  fields: [
    {
      name: 'showAlert',
      title: 'Show alert on homepage',
      type: 'boolean',
    },
    {
      name: 'alertTitle',
      title: 'Alert heading',
      type: 'string',
    },
    {
      name: 'alertText',
      title: 'Alert text',
      type: 'sm-block',
    },
  ],
}
