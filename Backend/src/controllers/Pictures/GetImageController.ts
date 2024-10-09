import { GetImageService } from "../../services/Pictures/GetImageService";
import { FastifyRequest, FastifyReply } from "fastify";
import { paramImage } from "../../types/Upimage";
import { PrismaClient } from "@prisma/client";
import { ExistsError } from "../../error/ExistsError";

class GetImageController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async handle(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const userData = request.query as paramImage;
    const imageService = new GetImageService(this.prisma);

    try {
      const pdfBuffer = await imageService.execute(userData);
      response.send(pdfBuffer);
    } catch (error) {
      if (error instanceof ExistsError) {
        response.status(400).send({ error: error.message });
      } else {
        response.send(error)
      }
    }
  }
}

export { GetImageController };
