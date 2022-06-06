export namespace Posts {
  export interface IPostBackendResult {
    data: {
      posts: IBackendPost[];
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

  export interface IBackendPost {
    title: string;
    body: string;
    _v: number;
    _id: string;
  }

  export type PostData = { title: string; body: string };
}
