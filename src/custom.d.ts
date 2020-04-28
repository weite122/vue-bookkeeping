type RootState = {
  recordList: RecordItem[];
  createRecordError: Error | null;
  createTagError: Error | null;

  tagList: Tag[];
  currentTag?: Tag;
}
type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
  createDate: string;
}
type Total = {
  date: string;
  total: number;
}
type RResult = {title: string; total: number;items: RecordItem[]}[];

type Tag = {
  id: string;
  name: string;
  iconName?: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated'; // 联合类型
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  remove: (id: string) => boolean;
  save: () => void;
}