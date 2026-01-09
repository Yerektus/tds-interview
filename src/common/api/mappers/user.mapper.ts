import type { User } from "@/common/entities/user";
import type { UserResponse } from "../responses/user.reponse";

export function mapUserResponseToUser(userResponse: UserResponse): User {
    return {
        id: userResponse.id,
        firstname: userResponse.firstName,
        lastname: userResponse.lastName,
        email: userResponse.email,
        skills: userResponse.skills,
        createdAt: userResponse.createdAt,
    };
}
