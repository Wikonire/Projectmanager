export interface OverviewAction<T> {
  label: string;
  icon?: string;
  action: (selectedRows: T[]) => void; // Aktion für mehrere Zeilen
  showIfAllSelected: boolean|undefined;
  description?: (count:number) => string;
}
export interface OverviewColumn {
  label: string;
  name: string;
  type: 'date' | undefined;}
