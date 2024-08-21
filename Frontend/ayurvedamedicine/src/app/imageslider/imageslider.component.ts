import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-imageslider',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatIconModule],
  templateUrl: './imageslider.component.html',
  styleUrl: './imageslider.component.css'
})
export class ImagesliderComponent {
  slides = [
    { imageUrl: 'https://www.aimilpharma.life/cdn/shop/articles/blog-banner.jpg?v=1602927357' },
    { imageUrl: 'https://yashremedies.com/cdn/shop/files/Banner1_6617d195-69fd-484c-99a9-9eeac21e126a.jpg?v=1692598358' },
    { imageUrl: 'https://ayurvedamegastore.com/blog/wp-content/uploads/2024/05/About-Ayurveda-Science.jpg' },
    { imageUrl: 'https://pranadaayurved.in/wp-content/uploads/2022/10/home-banner-2-min.jpg' },
    { imageUrl: 'https://cpimg.tistatic.com//44318/17/template_photo_1.jpg' },
    { imageUrl: 'https://www.shutterstock.com/image-photo/different-fresh-herbs-spices-on-600nw-2162714633.jpg' }
];
  
  currentIndex = 0;

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.slides.length - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex < this.slides.length - 1) ? this.currentIndex + 1 : 0;
  }
}
