export type AuthenticationRequest = {
    username: string;
    password: string;
};
export type AuthenticationData = {
    AccessToken: string;
    ExpiresIn: number;
    TokenType: number;
    RefreshToken: string;
    IdToken: string;
};
export type DeveloperAccessData = {
    AccessToken: string;
};
