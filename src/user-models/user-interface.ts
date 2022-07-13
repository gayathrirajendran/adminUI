export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  isSelected: boolean;
  isEdit: boolean;
  // actionsApplicable: string[];
}

export interface TableRow {
  currentAction: 'edit' | 'delete' | 'view';
}
