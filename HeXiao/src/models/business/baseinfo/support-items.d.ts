interface SelectItemsCategoryResultModel {
  id: string;
  pId: string;
  code: string,
  name: string,
  isDefault: boolean,
  childs: [
    string
  ];
  children: SelectItemsCategoryResultModel[]
}

interface SelectItemsResultModel {
  id: string;
  categoryId: string;
  code: string,
  name: string,
  description: string,
  enabled: boolean
  isSystem: boolean;
}
