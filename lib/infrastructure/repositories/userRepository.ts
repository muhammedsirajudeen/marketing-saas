import { prisma } from '../database/prisma';
import { IUserRepository } from '@/lib/domain/repositories/IUserRepository';
import { User, CreateUserInput, UpdateUserInput } from '@/lib/domain/entities/User';

/**
 * User Repository Implementation
 * Concrete implementation of IUserRepository using Prisma
 */

export class UserRepository implements IUserRepository {
    async findById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { id },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { email },
        });
    }

    async findByGoogleId(googleId: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { googleId },
        });
    }

    async create(input: CreateUserInput): Promise<User> {
        return await prisma.user.create({
            data: input,
        });
    }

    async update(id: string, input: UpdateUserInput): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data: input,
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id },
        });
    }
}

export const userRepository = new UserRepository();
