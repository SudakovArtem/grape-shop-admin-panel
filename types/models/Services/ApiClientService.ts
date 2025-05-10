export interface ApiClientService {
  request(data: any): Promise<any>
}
