import S from '@sanity/desk-tool/structure-builder';

import { FiSettings, FiHome, FiFile, FiUsers } from 'react-icons/fi';

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(FiSettings)
        .child(
          S.editor()
            .title('Site settings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.listItem()
        .title('One-off pages')
        .child(
          S.list()
            .title('One-off pages')
            .items([
              S.listItem()
                .title('Homepage')
                .icon(FiHome)
                .child(
                  S.editor()
                    .title('Homepage')
                    .schemaType('homepageContent')
                    .documentId('homepageContent')
                ),
              S.listItem()
                .title('About the school')
                .icon(FiFile)
                .child(
                  S.editor()
                    .title('About the school')
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                ),
              S.listItem()
                .title('Policies page')
                .icon(FiFile)
                .child(
                  S.editor()
                    .title('Policies page')
                    .schemaType('policiesPage')
                    .documentId('policiesPage')
                ),
            ])
        ),
      S.listItem()
        .title('Staff directory')
        .icon(FiUsers)
        .child(
          S.editor()
            .title('Staff directory')
            .schemaType('staffDirectory')
            .documentId('staffDirectory')
        ),
      ...S.documentTypeListItems().filter(listItem => {
        return ![
          'siteSettings',
          'homepageContent',
          'policiesPage',
          'aboutPage',
          'staffDirectory',
        ].includes(listItem.getId());
      }),
    ]);
