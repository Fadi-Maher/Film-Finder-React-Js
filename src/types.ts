export interface Movie  {
    id: number;
    title: string;
    year:number;
   medium_cover_image:string
   rating: number ;
   title_long:string
   genres:string
   description_full:string
   large_cover_image:string
   director:string
   torrents:string
   download_link:string
 
 }

 export interface MovieApiResponse {
  data: {
    movies: Movie[];
  };
}