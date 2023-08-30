declare module "../../api/serverAPI" {
  export function get(url: string): Promise<any>;
  export function post(url: string, data: any): Promise<any>;
}
