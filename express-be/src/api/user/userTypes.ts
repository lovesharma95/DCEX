import { Provider } from "@/common/orm/entities/user/types";

export type UserWithWallet = {
  email: string;
  sub?: string;
  name?: string;
  profilePicture?: string;
  password?: string;
  provider: Provider;
  solWallet: {
    publicKey: string;
    privateKey: string;
  };
  inrWallet: {
    balance: number;
  };
};
