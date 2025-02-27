import { Repository } from "typeorm";
import { User } from "@/common/orm/entities/user/User";
import { SolWallet } from "@/common/orm/entities/solWallet/SolWallet";
import { InrWallet } from "@/common/orm/entities/inrWallet/InrWallet";
import { UserWithWallet } from "./userTypes";
import { connectionManager } from "@/common/orm/dbConnection";

export class UserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = connectionManager.getRepository(User);
  }

  async createUserWithWallets(data: UserWithWallet): Promise<User> {
    // Create new User entity
    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.sub = data.sub;
    user.profilePicture = data.profilePicture;
    user.password = data.password;
    user.provider = data.provider;

    // Create new SolWallet entity
    const solWallet = new SolWallet();
    solWallet.publicKey = data.solWallet.publicKey;
    solWallet.privateKey = data.solWallet.privateKey;

    // Create new InrWallet entity
    const inrWallet = new InrWallet();
    inrWallet.balance = data.inrWallet.balance;

    // Associate wallets with the user
    user.solWallet = solWallet;
    user.inrWallet = inrWallet;

    // Save the user along with the wallets
    return this.userRepository.save(user);
  }

  async updateUser(
    data: Omit<UserWithWallet, "solWallet" | "inrWallet" | "email">,
    user: User
  ): Promise<User> {
    // update User entity
    user.name = data.name;
    user.profilePicture = data.profilePicture;
    user.sub = data.sub;
    user.password = data.password;
    user.provider = data.provider;

    // Save the user
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      email: email,
    });
  }
}
