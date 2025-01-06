import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }
  //if user exit then check in superbase, not in there then create new entry
  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }
    //if not find in db then create new user
    const name = `${user.firstName} ${user.lastName}`;
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageurl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    return newUser;
  } catch (err) {
    console.log(err.message);
  }
};
