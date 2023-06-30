import React from 'react';
import {
  default as ContentLoader,
  SkeletonProps,
} from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export const Skeleton = ({ height = 50, ...props }: SkeletonProps) => (
  <ContentLoader {...{ height, ...props }} />
);
