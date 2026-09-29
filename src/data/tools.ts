import { ToolItem } from '../types';

export const TOOLS: ToolItem[] = [
  {
    id: 'background-remover',
    title: 'Background Remover',
    description: 'Instantly remove backgrounds from portraits, products, and objects with free client-side browser AI.',
    category: 'AI',
    iconName: 'Scissors',
    badge: 'Popular',
    isPopular: true
  },
  {
    id: 'compressor',
    title: 'Image Compressor',
    description: 'Reduce file size of PNG, JPEG, and WebP images without noticeable quality loss.',
    category: 'Optimize',
    iconName: 'Minimize2',
    badge: 'Fast',
    isPopular: true
  },
  {
    id: 'resizer',
    title: 'Image Resizer & Cropper',
    description: 'Resize images to exact dimensions in pixels or percentages with aspect ratio locking.',
    category: 'Edit',
    iconName: 'Maximize',
    isPopular: false
  },
  {
    id: 'converter',
    title: 'Format Converter',
    description: 'Convert images instantly between PNG, JPEG, WebP, and AVIF formats.',
    category: 'Convert',
    iconName: 'RefreshCw',
    isPopular: true
  },
  {
    id: 'watermarker',
    title: 'Watermark Studio',
    description: 'Protect your visual assets by adding customizable text or logo watermarks.',
    category: 'Edit',
    iconName: 'Shield',
    isPopular: false
  },
  {
    id: 'palette',
    title: 'Color Palette Extractor',
    description: 'Extract dominant HEX and RGB color swatches from any uploaded photograph.',
    category: 'AI',
    iconName: 'Palette',
    isPopular: false
  }
];
