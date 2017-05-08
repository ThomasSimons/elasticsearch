export class Jobs {

  constructor(public date?: string, public count?: number)
  {
    this.date = date || "";
    this.count = count || 0;
  }
}
