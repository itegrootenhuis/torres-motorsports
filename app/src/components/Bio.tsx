'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import { Bio as BioType } from '@/types';
import { urlFor } from '@/lib/sanity';

const VISIBLE_CHAR_COUNT = 1516;

function getBlockText(block: PortableTextBlock): string {
  if (!('children' in block) || !Array.isArray(block.children)) return '';
  return (block.children as { text?: string }[])
    .map((c) => c.text ?? '')
    .join('');
}

function splitBodyByCharCount(
  body: PortableTextBlock[],
  maxChars: number
): { before: PortableTextBlock[]; after: PortableTextBlock[] } {
  const fullText = body.map(getBlockText).join('');
  if (fullText.length <= maxChars) return { before: body, after: [] };

  let acc = 0;
  const before: PortableTextBlock[] = [];
  let splitBlockIndex = -1;
  let splitOffset = 0;

  for (let i = 0; i < body.length; i++) {
    const text = getBlockText(body[i]);
    if (acc + text.length <= maxChars) {
      before.push(body[i]);
      acc += text.length;
    } else {
      splitBlockIndex = i;
      splitOffset = maxChars - acc;
      break;
    }
  }

  if (splitBlockIndex === -1) return { before, after: [] };

  if (splitOffset === 0) {
    return {
      before,
      after: body.slice(splitBlockIndex),
    };
  }

  const block = body[splitBlockIndex];
  const children = 'children' in block && Array.isArray(block.children) ? block.children : [];
  type Span = { _type: string; text?: string; marks?: string[]; [key: string]: unknown };
  let spanAcc = 0;
  const beforeSpans: Span[] = [];
  const afterSpans: Span[] = [];
  let inBefore = true;

  for (const span of children as Span[]) {
    const text = span.text ?? '';
    const spanLen = text.length;
    if (inBefore && spanAcc + spanLen <= splitOffset) {
      beforeSpans.push(span);
      spanAcc += spanLen;
    } else if (inBefore && spanAcc < splitOffset) {
      const cut = splitOffset - spanAcc;
      beforeSpans.push({ ...span, text: text.slice(0, cut) });
      if (cut < spanLen) {
        afterSpans.push({ ...span, text: text.slice(cut) });
      }
      spanAcc = splitOffset;
      inBefore = false;
    } else {
      afterSpans.push(span);
    }
  }

  const beforeBlock: PortableTextBlock = {
    ...block,
    _key: `${(block as { _key?: string })._key ?? 'split'}_a`,
    children: beforeSpans,
  };
  before.push(beforeBlock);

  const after: PortableTextBlock[] = [];
  if (afterSpans.length > 0) {
    after.push({
      ...block,
      _key: `${(block as { _key?: string })._key ?? 'split'}_b`,
      children: afterSpans,
    });
  }
  for (let i = splitBlockIndex + 1; i < body.length; i++) {
    after.push(body[i]);
  }

  return { before, after };
}

const sharedComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
    ),
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl font-bold text-white mb-4">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-white mb-3">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold text-white mb-2">{children}</h3>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-red hover:underline"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside text-gray-300 mb-4">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside text-gray-300 mb-4">{children}</ol>
    ),
  },
};

interface BioProps {
  bio: BioType;
}

export default function Bio({ bio }: BioProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { before, after } = useMemo(
    () =>
      bio?.body
        ? splitBodyByCharCount(bio.body, VISIBLE_CHAR_COUNT)
        : { before: [], after: [] },
    [bio?.body]
  );
  const showReadMore = after.length > 0;

  if (!bio) return null;

  const hasImage = !!bio.image;

  return (
    <section id="about" className="section-padding bg-primary-black">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className={`${
            hasImage
              ? 'grid md:grid-cols-2 gap-8 md:gap-12'
              : 'max-w-3xl mx-auto text-center'
          }`}
        >
          {/* Image */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-lg overflow-hidden"
            >
              <Image
                src={urlFor(bio.image!).width(600).height(750).quality(85).url()}
                alt={bio.heading}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          )}

          {/* Content */}
          <div className={hasImage ? '' : ''}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: hasImage ? 0.3 : 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase"
            >
              {bio.heading}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: hasImage ? 0.4 : 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <PortableText value={before} components={sharedComponents as React.ComponentProps<typeof PortableText>['components']} />
              {showReadMore && (
                <>
                  {isExpanded && <PortableText value={after} components={sharedComponents as React.ComponentProps<typeof PortableText>['components']} />}
                  <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-2 text-primary-red hover:text-red-400 font-medium transition-colors"
                  >
                    {isExpanded ? 'Show less' : 'Read more'}
                  </button>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
