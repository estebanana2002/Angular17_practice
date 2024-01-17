import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
interface Song {
  name: string;
  artist: string;
  album: string;
  url: string;
  image: string;
  description: string;
}
@Component({
  selector: 'app-control-flow',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './control-flow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ControlFlowComponent {
  public showContent: boolean = false;
  public showMusicModal: boolean = false;
  public calificacion: number = 0;
  public especificSong!: Song;

  public mySongs: Song[] = [
    {
      name: 'The pretender',
      artist: 'Foo Fighters',
      album: 'The pretender',
      url: 'https://www.youtube.com/watch?v=SBjQ9tuuTJQ&pp=ygUadGhlIHByZXRlbmRlciBmb28gZmlnaHRlcnM%3D',
      image: 'https://img.discogs.com/bWlgVwJpc4DwPbo4QpT8zMVy_7E=/fit-in/597x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-2556108-1388081791-2393.jpeg.jpg',
      description: '“The Pretender” revela las actividades de personas con autoridad que en un intento por mantenerse en el poder utilizan todas las formas de mentiras y fingen controlar las creencias y emociones de los ciudadanos.',
    },
    {
      name: 'La people',
      artist: 'Peso Pluma',
      album: 'Genesis',
      url: 'https://www.youtube.com/watch?v=sTHb2DESyVY&pp=ygUJbGEgcGVvcGxl',
      image: 'https://i.ytimg.com/vi/4prv7m-DxUk/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGCogRSh_MA8=&rs=AOn4CLCl2zQAeng1wqEcyX6uTyDQ04qZzQ',
      description: 'Genesis es el nuevo álbum de Peso Pluma, un cantante mexicano de corridos tumbados. El álbum contiene catorce canciones que mezclan el amor y el desamor con el sonido de las trompetas1. Peso Pluma explicó que el título del álbum significa comienzo y una nueva era, ya que marca un cambio en su carrera musical y su éxito.',
    },
    {
      name: 'Carnal',
      artist: 'Peso Pluma',
      album: 'Genesis',
      url: 'https://www.youtube.com/watch?v=K-eHa8UYwsU&pp=ygUGY2FybmFs',
      image: 'https://i.ytimg.com/vi/4prv7m-DxUk/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGCogRSh_MA8=&rs=AOn4CLCl2zQAeng1wqEcyX6uTyDQ04qZzQ',
      description: 'Genesis es el nuevo álbum de Peso Pluma, un cantante mexicano de corridos tumbados. El álbum contiene catorce canciones que mezclan el amor y el desamor con el sonido de las trompetas1. Peso Pluma explicó que el título del álbum significa comienzo y una nueva era, ya que marca un cambio en su carrera musical y su éxito.',
    },
    {
      name: 'Zapata',
      artist: 'Peso Pluma',
      album: 'Genesis',
      url: 'https://www.youtube.com/watch?v=GQWSSTkFsqU&pp=ygUGemFwYXRh',
      image: 'https://i.ytimg.com/vi/4prv7m-DxUk/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGCogRSh_MA8=&rs=AOn4CLCl2zQAeng1wqEcyX6uTyDQ04qZzQ',
      description: 'Genesis es el nuevo álbum de Peso Pluma, un cantante mexicano de corridos tumbados. El álbum contiene catorce canciones que mezclan el amor y el desamor con el sonido de las trompetas1. Peso Pluma explicó que el título del álbum significa comienzo y una nueva era, ya que marca un cambio en su carrera musical y su éxito.',
    },
    {
      name: 'Gavilan II',
      artist: 'Peso Pluma',
      album: 'Genesis',
      url: 'https://www.youtube.com/watch?v=MOt6-PXpwFQ&pp=ygUJZ2F2aWxhbiAy',
      image: 'https://i.ytimg.com/vi/4prv7m-DxUk/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGCogRSh_MA8=&rs=AOn4CLCl2zQAeng1wqEcyX6uTyDQ04qZzQ',
      description: 'Genesis es el nuevo álbum de Peso Pluma, un cantante mexicano de corridos tumbados. El álbum contiene catorce canciones que mezclan el amor y el desamor con el sonido de las trompetas1. Peso Pluma explicó que el título del álbum significa comienzo y una nueva era, ya que marca un cambio en su carrera musical y su éxito.',
    },
    {
      name: 'Mas altas que bajadas',
      artist: 'Natanael Cano',
      album: 'Nata Montana',
      url: 'https://www.youtube.com/watch?v=lQ0axrf1kVo&pp=ygUkbWFzIGFsdGFzIHF1ZSBiYWphZGFzIG5hdGFuYWVsIGNhbm8g',
      image: 'https://www.launion.com.mx/media/k2/items/cache/13a5975ca2a44850fca36d959b80de45_XL.jpg',
      description: 'Nata Montana es el undécimo álbum de estudio del cantante mexicano Natanael Cano. Fue lanzado el 30 de junio de 2023 y fue producido por Jimmy Humilde Music y distribuido por Warner Music Latina. El álbum esta compuesto únicamente por corridos tumbados, a diferencia de su álbum anterior NataKong, el cual incluyó temas de trap y electrónica.',
    },
    {
      name: 'YW&F',
      artist: 'Oscar Maydon',
      album: 'Distorcion',
      url: 'https://www.youtube.com/watch?v=XOvdgqpRZQQ&pp=ygUEeXcmZg%3D%3D',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/29/8b/20/298b20db-21c3-ebe1-3c2f-236aaa2ac00d/196871717748.jpg/1200x1200bf-60.jpg',
      description: `Tu labial en mi cara (En mi cara)
      Te siento un poco extraña (Extraña)
      Te recorrí el mundo entero para encontrar lo sincero
      Tu amor se siente del bueno, por favor nunca te vayas (No te vayas)
      `
    }
  ];
  public foods: string[] = [
    'Memelas',
    'Garnachas',
    'Molotes',
    'Tlayudas',
    'Tacos dorados',
    'Pizza',
    'Maruchan',
    'Esquite',
    'Tostiesquite',
    'Pollo garnachero'
  ];

  public drinks: string[] = [];

  constructor( ) { }

  public toggleContent() {
    this.showContent =!this.showContent;
  }
  public toggleMusicModal(song?: Song) {
    this.showMusicModal = !this.showMusicModal;
    if ( this.showMusicModal ) {
      this.especificSong = song || {
        name: '',
        artist: '',
        album: '',
        url: '',
        image: '',
        description: '',
      };
    }
  }

  public rate(event: Event) {
    const puntuacion = (event.target as HTMLInputElement).value;
    this.calificacion = parseInt(puntuacion);
    // console.log('%c' + valorSeleccionado,
    // 'font-size: 25px; background-color: #1D1D1D; color: #ffffff');
  }
}
