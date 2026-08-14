import { ProductService } from './product.service';

export interface StockAlert {
  productId: string;
  title: string;
  stock: number;
  threshold: number;
}

export class InventoryService {
  public static async getLowStockAlerts(threshold: number = 15): Promise<StockAlert[]> {
    const products = await ProductService.getProducts();
    return products
      .filter((p) => p.stock <= threshold)
      .map((p) => ({
        productId: p.id,
        title: p.title,
        stock: p.stock,
        threshold,
      }));
  }

  public static async updateStock(productId: string, newStock: number): Promise<boolean> {
    const updated = await ProductService.updateProduct(productId, { stock: newStock });
    return !!updated;
  }
}
