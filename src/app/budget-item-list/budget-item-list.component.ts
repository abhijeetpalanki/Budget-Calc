import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BudgetItem } from "src/shared/models/budget-item.model";
import { MatDialog } from "@angular/material";
import { EditItemModalComponent } from "../edit-item-modal/edit-item-modal.component";

@Component({
  selector: "app-budget-item-list",
  templateUrl: "./budget-item-list.component.html",
  styleUrls: ["./budget-item-list.component.scss"]
})
export class BudgetItemListComponent implements OnInit {
  @Input() budgetItems: BudgetItem[];
  @Output() deleteItem: EventEmitter<BudgetItem> = new EventEmitter<
    BudgetItem
  >();
  @Output() updateItem: EventEmitter<UpdateEvent> = new EventEmitter<
    UpdateEvent
  >();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  onDeleteItem(item: BudgetItem) {
    this.deleteItem.emit(item);
  }

  onCardClicked(item: BudgetItem) {
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: "580px",
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateItem.emit({
          old: item,
          new: result
        });
      }
    });
  }
}

export interface UpdateEvent {
  old: BudgetItem;
  new: BudgetItem;
}
