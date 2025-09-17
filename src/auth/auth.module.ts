import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthDomainService } from './auth.service';
import { AuthRoleService } from '../core/applications/auth/role.service';
import { Auth0Module } from '../infrastructure/auth0/auth0.module';
import { AuthRepository } from '../infrastructure/auth/auth.repository.impl';
import { ROLE_PROVIDER } from './role.provider';
import { Auth0RoleProvider } from '../infrastructure/auth0/auth0-role.provider';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' }), Auth0Module],
    providers: [
        JwtStrategy,
        AuthDomainService,
        AuthRoleService,
        { provide: 'IAuthRepository', useClass: AuthRepository },
        { provide: ROLE_PROVIDER, useClass: Auth0RoleProvider }, // Nest will inject Auth0Service automatically
    ],
    exports: [AuthDomainService, AuthRoleService],
})
export class AuthModule { }
