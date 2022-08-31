export declare class ExceptionService {
    trowBadRequest(message?: string, error?: string): void;
    throwForbiddenException(message?: string, error?: string): void;
    throwNotFoundException(error?: string, message?: string): void;
    throwUnauthorizedException(error?: string, message?: string): void;
}
