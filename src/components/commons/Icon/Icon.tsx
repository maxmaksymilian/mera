import React from 'react';
import SVG from 'react-inlinesvg';

import { clsxm } from '@/lib';

import { Skeleton } from '@/components/commons/Skeleton/Skeleton';

import { IconProps } from './IconModel';

export const Icon = ({ name, className, ...delegated }: IconProps) => (
  <SVG
    {...{
      ...delegated,
      src: `/svg/${name}.svg`,
      className: clsxm('h-auto', className),
      loader: <Skeleton {...{ height: 38 }} />,
    }}
  />
);
