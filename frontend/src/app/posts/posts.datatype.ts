export namespace Posts {
  export interface IPost {
    id: string;
    title: string;
    body: string;
    timestamp?: Date;
  }
}
