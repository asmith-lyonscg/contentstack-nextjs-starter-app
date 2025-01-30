import { Component } from "../typescript/component";
import { Image } from "../typescript/action";
import { Entry, HeaderProps ,FooterProps } from "./layout";

type AdditionalParam = {
  title: string;
  title_h2: string;
  title_h3: string;
  description: string;
  banner_title: string;
  banner_description: string;
  designation: string;
  name: string;
  html_code: string;
  body: string;
  date: string;
  uid:string;
  related_post: [];
  copyright: string;
  announcement_text: string;
  label: {};
  url: string;
}

type Post = {
  url: string;
  is_archived: boolean;
  body: string;
  featured_image: Image;
  title: string;
  date: string;
  author: [Author];
  $: AdditionalParam;
}

type Author = {
  title: string;
  $: AdditionalParam;
}

type PageProps = {
  page: Page;
  posts?: any[];
  archivePost?: any[];
  blogPost?: BlogPosts;
  entryUrl: string;
  Component: any;
  entries: Entry;
  pageProps: any;
  header: HeaderProps;
  footer: FooterProps;
}

type Seo = {
  enable_search_indexing: boolean
}

type Blog = {
  url: string;
  body: string;
  title: string;
  $: AdditionalParam;
}

export type Props = {
  page: Page;
  entryUrl: string;
  Component: any;
  entries: Entry;
  pageProps: PageProps;
  header: HeaderProps;
  footer: FooterProps;
  blogPost?: BlogPosts;
  blogList?: any[];
}

export interface Page {
  title: string;
  description: string;
  url: string;
  uid: string;
  locale: string;
  page_components: Component[];
  seo: Seo;
  entryUrl?: string;
}

export type Context = {
  resolvedUrl: string;
  setHeader: Function;
  write: Function;
  end: Function;
}

export type Pages = [
  page: Page
]

export type PostPage = [
  post: Post
]

export type PageUrl = string;

export type BlogPosts = {
  title: string;
  date: string;
  body: string;
  author: [Author];
  related_post: [Blog];
  locale: string;
  featured_image: Image;
  is_archived: boolean;
  seo: Seo;
  uid:string;
  url: string;
  _owner: string;
  $: AdditionalParam;
}

export type Products = {
  title: string;
  product_display_name: string;
  product_description: {
    type: string;
    uid: string;
    attrs: any;
    children: any[];
  };
  product_image: Image;
  url: string;
  uid: string;
  locale: string;
  modular_pdp_layout: Array<{
    specs?: {
      specs: Array<{
        spec_value: string;
        spec_unit: string;
        spec_label: string;
        _metadata: {
          uid: string;
        };
      }>;
      _metadata: {
        uid: string;
      };
    };
    testimonials?: {
      testimonial: Array<{
        uid: string;
        _content_type_uid: string;
      }>;
      _metadata: {
        uid: string;
      };
    };
  }>;
  _version: number;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  _owner: string;
  $?: AdditionalParam;
};