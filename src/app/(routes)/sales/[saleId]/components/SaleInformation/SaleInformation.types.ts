export type SaleInformationProps = {
  sale: {
    id: number,
    clientId: number,
    saleDate: Date,
    totalRevenue: string,
    status: string,
    paymentMethod: string,
    notes: string,
  };
}