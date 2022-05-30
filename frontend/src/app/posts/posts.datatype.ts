export namespace Posts {
  export interface IPostBackendResult {
    data: {
      posts: IPost[];
      results: number;
      status: string;
    };
  }
  export interface IPost {
    id: string;
    title: string;
    body: string;
    timestamp?: Date;
  }
}
