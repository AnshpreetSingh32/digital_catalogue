export interface PageData {
  type: 'image' | 'video' | 'toc';
  content?: string; // URL for image/video
  title?: string;
  specUrl?: string; // URL for the "Download Spec" button
  requestQuote?: boolean; // Whether to show "Request Quote" button
}
