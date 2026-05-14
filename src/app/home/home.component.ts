import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
title = 'MCI Pereira';
  isMenuOpen = false;
  currentIndex = 0;
  autoPlayInterval: any;
  autoPlayEnabled = true;
  autoPlayDelay = 6000; // 6 segundos

  phoneNumber: string = '573186693117'; // Número con código de país
  message: string = 'Hola! Me interesa obtener más información.';
  showTooltip: boolean = true;
  tooltipText: string = '¿Tienes preguntas? ¡Escríbenos!';


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeMenu();
  }

  reuniones = [
    {
      img: './assets/3.JPG',
      title: 'REUNIONES JÓVENES TODOS LOS SÁBADOS',
      subtitle: '3:30PM'
    },
    {
      img: './assets/2.jpg',
      title: 'REUNIONES FAMILIARES TODOS LOS DOMINGOS',
      subtitle: '8:30AM Y 11:00AM'
    }
  ];

  eventos = [
    {
      image: './assets/Con_Verdad.jpg',
      alt: 'Conociendo la Verdad'
    },
    {
      image: './assets/Cap_Destino.jpeg',
      alt: 'Capacitación Destino'
    },
    {
      image: './assets/desparchados.png',
      alt: 'Desparchados'
    },
    {
      image: './assets/campJovenes.png',
      alt: 'Campamento'
    },
    {
      image: './assets/encuentro.png',
      alt: 'Encuentro'
    },
    {
      image: './assets/entreAmigas.png',
      alt: 'Reunión Mujeres'
    },
    {
      image: './assets/hombres2.jpeg',
      alt: 'Reunión Hombres'
    }
  ];

  ngOnInit() {
    if (this.autoPlayEnabled) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.eventos.length;
    this.resetAutoPlay();
  }

  prevSlide() {
    this.currentIndex = this.currentIndex === 0 
      ? this.eventos.length - 1 
      : this.currentIndex - 1;
    this.resetAutoPlay();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.resetAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  resetAutoPlay() {
    if (this.autoPlayEnabled) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  openWhatsApp(): void {
    const encodedMessage = encodeURIComponent(this.message);
    const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }

}
