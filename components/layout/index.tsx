import { HeaderProps, FooterProps, Entry } from '../../typescript/layout';
import { Page, BlogPosts } from '../../typescript/pages';
import React from 'react';

interface LayoutProps {
  header: HeaderProps;
  footer: FooterProps;
  page: Page;
  blogPost?: BlogPosts | undefined;
  blogList?: any[];
  entries: Entry;
  children: React.ReactNode;
} 