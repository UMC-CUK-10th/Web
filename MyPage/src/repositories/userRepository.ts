import client from "../api/client";
import type { User, UpdateUserRequest } from "../types/User";

const userRepository = {
    getMe: () => client.get<{ data: User }>('/v1/users/me').then(r => r.data.data),
    update: (data: UpdateUserRequest) => client.patch<{ data: User }>('/v1/users', data).then(r => r.data.data),
};

export default userRepository;