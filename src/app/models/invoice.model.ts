import { InvoiceItem } from "./invoice-item.model";

export class Invoice {

    public id?: number;
    public price?: number;
    public quantity?: number;
    public discount?: number;
    public articleType?: string;

    public invoiceItem: InvoiceItem[] = [];
}
