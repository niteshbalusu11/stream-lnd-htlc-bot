export type Forward = {
  at: Date;
  in_channel_alias: string;
  out_channel_alias: string;
  tokens: number;
  fee: number;
  external_failure: string;
  in_channel: string;
  out_channel: string;
  in_pubkey: string;
  out_pubkey: string;
};

export type FailureFileData = {
  [table: number]: {
    at: Date;
    inchannel: string;
    outchanne: string;
    tokens: number;
    fee: number;
    failure: string;
  };
};
