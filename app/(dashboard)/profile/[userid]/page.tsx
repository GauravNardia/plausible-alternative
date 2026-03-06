import { auth } from '@/auth';
import DeleteAccountCard from '@/components/cards/DeleteAccountCard';
import ProfileCard from '@/components/cards/ProfileCard'
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';


const Profile = async() => {
  const session = await auth();
  if(!session || !session.user?.id) {
    redirect('/sign-in')
  }

  const userId = session.user.id;

  // 👇 fetch fresh email from DB, not session
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  if (!user.length) redirect('/sign-in')

  const email = user[0].email // fresh from DB every time

  return (
    <section className="min-h-screen bg-[#ffffff] text-black py-20">
      <div className='max-w-6xl mx-auto'>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-4xl font-semibold font-bpmf">
           Profile
          </h1>
          <p className="text-neutral-600 mt-4">
          Manage your account details.
          </p>
        </div>
        <div className="dot-bg h-[60px] sm:h-[80px] border-y" />
         <ProfileCard email={email} userId={userId} />
         <DeleteAccountCard userId={userId} />
      </div>
    </section>
  )
}

export default Profile