import React from 'react';

export interface TProject {
  id?: number;
  name: string;
  descriptions: string;
  tipe: string;
  library: string[];
  image: string;
  link: string | null;
  video?: string | null;
}

export interface TPackage {
  name: string;
  description: string;
  url: string;
  repository: string;
  downloads: number;
  favers: number;
  type?: 'composer' | 'npm';
}

export interface TGithubStats {
  public_repos: number;
  followers: number;
  total_stars: number;
  top_languages: { name: string; percentage: number; color: string }[];
}

export interface TTechnology {
  id?: number;
  name: string;
  icon: string;
}

export interface TArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  is_published: boolean;
  published_at: string;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface TExperience {
  id?: number;
  title: string;
  company_name: string;
  icon: string;
  icon_bg: string;
  date_range: string;
  points: string[];
}

export interface TCertificate {
  id?: number;
  title: string;
  issuer: string;
  image: string;
  date_issued: string;
}

export interface TTestimonial {
  id?: number;
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

export interface NavItem {
    title: string;
    href: string | any;
    icon?: React.ComponentType<{ className?: string }> | null;
}

export interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export type AppVariant = 'header' | 'sidebar';

export interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    variant?: AppVariant;
}

export interface PaginatedData<T> {
  data: T[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
}
