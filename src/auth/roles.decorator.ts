// src/core/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Use @Roles('admin', 'manager') on a route to require these roles
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
