import createImageUrlBuilder from '@sanity/image-url';
import { SanityDocument } from '@sanity/client';

import { dataset, projectId } from '../../sanity/env';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (source: SanityDocument) => {
  return imageBuilder?.image(source).auto('format').fit('max');
};
