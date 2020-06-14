export default {
  title: 'Homepage',
  name: 'homepageContent',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'splashImage',
      title: 'Splash image',
      type: 'image',
    },
    {
      name: 'principalsWelcome',
      title: 'Principals welcome',
      type: 'sm-block',
    },
    {
      name: 'alert',
      title: 'Alert',
      type: 'alert',
    },
  ],
};
