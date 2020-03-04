import { ApiResponse } from "../../shared/interfaces/api-response";

export class Utils {
    constructor() { }
    static createErrorResponse(error: string): ApiResponse {
        return {
            success: false,
            data: error
        }
    }
    static createSuccessResponse(data: any): ApiResponse {
        return {
            success: true,
            data: data
        }
    }
}
