    import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
    } from '@nestjs/common';

    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import { User } from '../users/entities/user.entity';
    import { RegisterDto } from './dto/register.dto';
    import { SupabaseService } from './supabase.client';
    import { LoginDto } from './dto/login.dto';

    @Injectable()
    export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly supabase: SupabaseService,
    ) {}

    async register(dto: RegisterDto) {
        const { data, error } =
        await this.supabase.client.auth.admin.createUser({
            email: dto.email,
            password: dto.password,
            email_confirm: true
        });

        if (error) {
        throw new BadRequestException(
            error.message,
        );
        }

        const user = this.userRepo.create({
        full_name: dto.full_name,
        email: dto.email,
        supabase_user_id: data.user.id,
        });

        await this.userRepo.save(user);

        return {
        message:
            'User registered successfully',
        user,
        };
    }

    async login(dto: LoginDto) {
        const { data, error } =
        await this.supabase.client.auth.signInWithPassword({
            email: dto.email,
            password: dto.password,
        });

        if (error) {
        throw new UnauthorizedException(
            error.message,
        );
        }

        return {
        message: 'Login successful',
        session: data.session,
        user: data.user,
        };
    }

        async findBySupabaseId(
            supabaseUserId: string,
            ): Promise<User | null> {
            return this.userRepo.findOne({
                where: {
                supabase_user_id: supabaseUserId,
                },
            });
        }

        async getMe(token: string) {
            const { data, error } =
                await this.supabase.client.auth.getUser(token);

            if (error || !data.user) {
                throw new UnauthorizedException(
                'Invalid token',
                );
            }

            return this.userRepo.findOne({
                where: {
                    supabase_user_id: data.user.id,
                },
            });
        }
    }
