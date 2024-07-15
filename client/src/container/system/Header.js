import { Navigation } from '../public'

function Header() {
    return (
        <div className='w-full flex h-[40px]'>
            <div className=' flex-none flex font-bold bg-secondary w-[256px] text-white items-center justify-center'>
                Phongtro123.com
            </div>
            <div className='flex-auto ]'>
                <Navigation isAdmin={true}></Navigation>
            </div>
        </div>
    );
}

export default Header;