import { ProductDataService } from '@core/index';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent } from '@angular/material';
import { Product } from "@core/products/product";
import { CartService } from '@core/cart/cart.service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Product>();
  loading = true;
  subscriptions = [];
  displayedColumns = ['imgUrl', 'name', 'description','price', 'action',];
  itemsPerPage = 3; // Set the default number of items per page here

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productDataService: ProductDataService, private cartService: CartService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.productDataService
        .getAllProducts()
        .subscribe((products) => this.onDataLoad(products))
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addItemToCart(product) {
    this.cartService.addToCart(product, 2);
  }

  onDataLoad(products: Product[]) {
    this.loading = false;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = products;

    // Subscribe to the page event of the paginator
    this.paginator.page.subscribe((event: PageEvent) => {
      this.itemsPerPage = event.pageSize;
      this.updateComponentHeight();
    });

    this.updateComponentHeight();
  }

  private updateComponentHeight() {
    // Update the height of the component based on the number of items per page
    let newHeight = 134.5; // Default height

    if (this.itemsPerPage === 6) {
      newHeight *= 1.53; // Apply the multiplication factor only when itemsPerPage is 9
    }

    if (this.itemsPerPage === 9) {
      newHeight *= 2.06; // Apply the multiplication factor only when itemsPerPage is 9
    }

    const exampleCard = document.querySelector('.example-card') as HTMLElement;
    exampleCard.style.height = `${newHeight}%`;
  }

  slides = [
    {'image': 'assets/ayurwedasecond.jpeg'},
    {'image': 'assets/ayurwedaone.jpeg'}, 
    {'image': 'assets/ayurwedathree.jpeg'}, 
    {'image': 'assets/ayurwedafour.jpeg'}, 
    {'image': 'assets/ayurwedafive.webp'}
  ];
}
