import {
  Component,
  Input,
  WritableSignal,
  signal,
  effect,
  ViewChild,
  OnInit,
  AfterViewInit,
  computed, Output, EventEmitter
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {OverviewAction, OverviewColumn} from '../../shared/interfaces/overview-action.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent<T extends { id: string | number }> implements OnInit, AfterViewInit {

  @Input() set data(value: T[]) {
    this.dataSignal.set(value);
  }

  @Input() columns: OverviewColumn[] = [];
  @Input({}) actions: OverviewAction<T>[] = [];
  @Input() title: string = '';
  dataSignal: WritableSignal<T[]> = signal([]);
  dataSource = new MatTableDataSource<T>([]);
  selectedItems: WritableSignal<Set<T>> = signal(new Set<T>());

  @ViewChild(MatSort) sort!: MatSort;

  visibleColumns = computed(() => {
    return ['select', ...this.columns.map(col => col.name)];
  });
  selectedCount = computed(() => this.selectedItems().size);

  isAllSelected = computed(() => {
    const totalItems = this.dataSource.data.length;
    return totalItems > 0 && this.selectedItems().size === totalItems;
  });

  isIndeterminate = computed(() => {
    const count = this.selectedItems().size;
    return count > 0 && count < this.dataSource.data.length;
  });

  hasDetailColumn = computed(() => {
  return this.columns.find(col => col.name === 'detail') !== undefined;
});


  hasEditColumn = computed(() => {
    return this.columns.find(col => col.name === 'edit') !== undefined;
  });

  isSelected = computed(() => (row: T) => this.selectedItems().has(row));

  buttonLabels = computed(() =>
    this.actions.map(action => ({
      action,
      label:
        this.selectedCount() === 0
          ? `Keine ${action.label}`
          : this.isAllSelected()
            ? `Alle ${action.label}`
            : `Ausgewählte ${this.selectedCount()} ${action.label}`
    }))
  );
  @Output() edit = new EventEmitter<T>();
  @Output() detail = new EventEmitter<T>();

  constructor() {
    effect(() => {
      this.dataSource.data = this.dataSignal();
    });

    effect(() => {
      this.selectedItems();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {}

  toggleSelection(row: T) {
    const selectedSet = new Set(this.selectedItems());
    selectedSet.has(row) ? selectedSet.delete(row) : selectedSet.add(row);
    this.selectedItems.set(selectedSet);
  }

  toggleAllSelection(isChecked: boolean) {
    this.selectedItems.set(isChecked ? new Set(this.dataSource.data) : new Set());
  }

  executeAction(action: OverviewAction<T>) {
    action.action(Array.from(this.selectedItems()));
  }

  onDetail(row: T) {
    this.detail.emit(row);
  }

  onEdit(row: T) {
    this.edit.emit(row)
  }


}
