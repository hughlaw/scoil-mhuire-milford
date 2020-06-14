// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import homepage from './homepage';
import alert from './alert';
import { smBlock } from './blockEditor';
import newsArticle from './newsArticle';
import event from './event';
import staffMember from './staffMember';
import settings from './settings';
import page from './page';
import navigation from './navigation';
import policy from './policy';
import policiesPage from './policiesPage';
import aboutTheSchool from './aboutTheSchool';
import staffDirectory from './staffDirectory';
import classPage from './classPage';
import smImage from './smImage';
import youtubeEmbed from './youtubeEmbed';
import footerLinks from './footerLinks';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    navigation,
    footerLinks,
    homepage,
    page,
    policy,
    policiesPage,
    classPage,
    aboutTheSchool,
    alert,
    smBlock,
    newsArticle,
    event,
    staffMember,
    staffDirectory,
    settings,
    smImage,
    youtubeEmbed,
  ]),
});
