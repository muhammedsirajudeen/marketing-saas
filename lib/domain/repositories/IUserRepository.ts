import { User, CreateUserInput, UpdateUserInput } from '../entities/User';

/**
 * User Repository Interface
 * Defines the contract for user data access operations
 */

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByGoogleId(googleId: string): Promise<User | null>;
    create(input: CreateUserInput): Promise<User>;
    update(id: string, input: UpdateUserInput): Promise<User>;
    delete(id: string): Promise<void>;
}
