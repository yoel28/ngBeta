export interface IData {
  agencia: string;
  provincia: string;
  direccion: string;
  lat: number;
  lon: number;
  index?: number;
  star?: boolean;
}
export interface IDataDetail extends IData {
  distrito: string;
  departamento: string;

}
