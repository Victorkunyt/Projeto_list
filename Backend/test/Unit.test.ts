// import { PrismaClient } from "@prisma/client";
// import { UsersService } from "../src/services/Users/RegisterUsers_service";

// // Mocking PrismaClient
// jest.mock('@prisma/client');

// describe('UsersService', () => {


//   test('should create new user', async () => {
//     const userData = {
//       name: 'Test Unit Test',
//       holderid: '06414054054',
//       status: true,
//       cellphone: '11987442953',
//       email: 'test@example.com',
//       gender: 'm',
//       password: 'Mudar@123',
//     };

//     // Mocking the response of `user.findFirst` to simulate no existing user
//     PrismaClient.user.findFirst.mockResolvedValue(null);

//     // Mocking the response of `user.create` to simulate the creation of a new user
//     PrismaClient.user.create.mockResolvedValue(userData);

//     const newUser = await UsersService.execute(userData);

//     // Verifying that the new user is created correctly
//     expect(newUser).toEqual(userData);

//     // Verifying that `user.findFirst` is called with the correct arguments
//     expect(prismaClientMock.user.findFirst).toHaveBeenCalledWith({
//       where: { email: userData.email },
//     });

//     // Verifying that `user.create` is called with the correct arguments
//     expect(prismaClientMock.user.create).toHaveBeenCalledWith({
//       data: userData,
//     });
//   });
// });
