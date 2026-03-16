import { auth } from '@/auth';
import DeleteAccountCard from '@/components/cards/DeleteAccountCard';
import ProfileCard from '@/components/cards/ProfileCard'
import { getUserById } from '@/lib/actions/user.action';
import { redirect } from 'next/navigation';


const Profile = async() => {
  const session = await auth()
  if (!session?.user?.id) redirect('/sign-in')

  const user = await getUserById(session.user.id)
  if (!user) redirect('/sign-in')

  return (
    <section className="min-h-screen bg-[#ffffff] text-black py-20">
      <div className='max-w-6xl mx-auto'>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-4xl font-semibold font-bpmf">
           Your Profile 
          </h1>
          <p className="text-neutral-600 mt-4">
           Keep your nest tidy.
          </p>
        </div>
        <div className="dot-bg h-[60px] sm:h-[80px] border-y" />
        <div className="px-3 sm:px-0">
         <ProfileCard email={user.email} userId={user.id} />
         <DeleteAccountCard userId={user.id} />
        </div>  
      </div>
    </section>
  )
}

export default Profile