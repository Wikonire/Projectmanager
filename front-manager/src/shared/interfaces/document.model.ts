export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  path: string;
  phase?: any | undefined;
  project?: any | undefined;
  activity?: any | undefined;
}
