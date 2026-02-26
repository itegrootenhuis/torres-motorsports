import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'torres-motorsports',
  title: 'Torres Motorsports',
  projectId: '94ennmup',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.listItem()
              .title('Hero')
              .child(
                S.document()
                  .schemaType('hero')
                  .documentId('hero')
              ),
            S.listItem()
              .title('Bio')
              .child(
                S.document()
                  .schemaType('bio')
                  .documentId('bio')
              ),
            S.divider(),
            S.listItem()
              .title('News Articles')
              .schemaType('newsArticle')
              .child(S.documentTypeList('newsArticle').title('News Articles')),
            S.listItem()
              .title('Videos')
              .schemaType('video')
              .child(S.documentTypeList('video').title('Videos')),
            S.listItem()
              .title('Gallery')
              .schemaType('galleryImage')
              .child(S.documentTypeList('galleryImage').title('Gallery Images')),
            S.listItem()
              .title('Schedule')
              .schemaType('scheduleEvent')
              .child(S.documentTypeList('scheduleEvent').title('Schedule Events')),
            S.listItem()
              .title('Sponsors')
              .schemaType('sponsor')
              .child(S.documentTypeList('sponsor').title('Sponsors')),
            S.listItem()
              .title('Contact Section')
              .child(
                S.document()
                  .schemaType('contactSection')
                  .documentId('contactSection')
              ),
            S.divider(),
            S.listItem()
              .title('Legal Pages')
              .schemaType('legalPage')
              .child(S.documentTypeList('legalPage').title('Legal Pages')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
