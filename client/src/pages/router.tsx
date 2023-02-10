import { createBrowserRouter } from 'react-router-dom';
import Demo from './demo';
import React, { lazy } from 'react';
import PageSpinner from '~components/PageSpinner';

const Stat = lazy(() => import('./stats'));
const Questions = lazy(() => import('./questions'));
const Editor = lazy(() => import('./editor'));
const Question = lazy(() => import('./question'));
const External = lazy(() => import('./external'));

export const enum RouterPath {
  stat = '/stat',
  question = '/question',
  questions = '/questions',
  editor = '/',
  external = '/external',
}

const router = createBrowserRouter([
  {
    path: RouterPath.editor,
    element: (
      <React.Suspense fallback={<PageSpinner />}>
        <Editor />
      </React.Suspense>
    ),
  },
  {
    path: RouterPath.question,
    element: (
      <React.Suspense fallback={<PageSpinner />}>
        <Question />
      </React.Suspense>
    ),
  },
  {
    path: RouterPath.questions,
    element: (
      <React.Suspense fallback={<PageSpinner />}>
        <Questions />
      </React.Suspense>
    ),
  },
  {
    path: RouterPath.stat,
    element: (
      <React.Suspense fallback={<PageSpinner />}>
        <Stat />
      </React.Suspense>
    ),
  },
  {
    path: RouterPath.external,
    element: (
      <React.Suspense fallback={<PageSpinner />}>
        <External />
      </React.Suspense>
    ),
  },
  {
    path: '/demo',
    element: <Demo />,
  },
]);

export default router;
