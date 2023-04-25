export interface User {
    id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    visitedPlaceIds: string[];
    role: "USER" | "ADMIN";
}
