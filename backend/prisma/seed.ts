import { PrismaClient, Prisma } from "@prisma/client";
import { AuthScope } from "../src/helpers/auth/scopes";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const rolesData: Prisma.RoleCreateInput[] = [
  {
    title: AuthScope.admin,
  },
  {
    title: AuthScope.user,
  },
];

const usersData: any = {
  [AuthScope.admin]: {
    name: "Administratorius Administrauskas",
    email: "admin@t.t",
    password: bcrypt.hashSync("admin", 10),
  },
  [AuthScope.user]: {
    name: "Vartotojas Vartojauskas",
    email: "test@t.t",
    password: bcrypt.hashSync("test", 10),
  },
};

async function main() {
  console.log(`Start seeding ...`);

  for (const data of rolesData) {
    const role = await prisma.role.create({ data });
    console.log(`Created role with id: ${role.id}`);

    const user = await prisma.user.create({
      data: {
        ...usersData[role.title],
        Role: {
          connect: {
            id: role.id,
          },
        },
      },
      include: {
        Role: true,
      },
    });

    console.log(
      `Created user with scope '${user.Role.title}' and id: ${user.id}`
    );
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
