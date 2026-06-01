export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  images: string[];
  colSpan?: string;
  href: string;
  tags: string[];
  metrics?: Record<string, string>;
  year: string;
}
