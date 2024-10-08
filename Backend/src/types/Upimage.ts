import { MultipartFile } from "fastify-multipart";

interface paramImage {
    userId: string;
    file: MultipartFile
  }
  
  export { paramImage };
  