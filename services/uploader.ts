import { ApiResponse } from "@/types";
import { AxiosProgressEvent, CancelToken } from "axios";
import { API_ENDPOINTS } from "./constants";
import { client } from "./client";

class UploaderService {
    async uploadFile(
        file: File,
        onUploadProgress?: (event: AxiosProgressEvent) => void,
        cancelToken?: CancelToken,
        timeout: number = 60000
    ): Promise<ApiResponse<string>> {
        console.log('UploaderService - Starting file upload:', {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            endpoint: API_ENDPOINTS.UPLOAD.BASE
        });

        try {
            const response = await client.uploadFile<string>(
                API_ENDPOINTS.UPLOAD.BASE, 
                file, 
                onUploadProgress, 
                cancelToken, 
                timeout
            );
            
            console.log('UploaderService - Upload successful:', response);
            return response;
        } catch (error: unknown) {
            throw error;
        }
    }
}

export const uploader = new UploaderService();
