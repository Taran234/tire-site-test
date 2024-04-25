import { PortableText } from '@portabletext/react'
import { TypedObject } from 'sanity';
type Props = {
  content: TypedObject;
};
import urlBuilder from '@sanity/image-url'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlForImage } from '../../../sanity/lib/image';

// Barebones lazy-loaded image component
const SampleImageComponent = ({ value }) => {
  const { width } = getImageDimensions(value)
  return (
    <img
      src={urlForImage(value)
      }
      alt={value.alt || ' '}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: 'inline-block',

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / 500,
      }}
    />
  )
}

const components = {
  types: {
    image: SampleImageComponent,
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
}

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto prose lg:prose-xl ">
      <PortableText value={content} components={components} />
    </div>
  );
}