'use client';
import LoginSpotify from '@/containers/LoginSpotify';
import Login from '@/containers/Login';
import Image from 'next/image';
import { useAuthStore } from '@/lib/authStore';
import { parseCookies } from '@/lib/utils/utils';
import LogoView from '@/components/LogoView';

export default function App() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);

  // TODO next step is to avoid Spotify to show up after log in
  // useEffect(() => {
  //   const cookieJar = parseCookies(document.cookie);

  //   let spotifyCookie;
  //   if (cookieJar) spotifyCookie = cookieJar['spotify_access_token'];

  //   console.log('cookieJar :>> ', cookieJar);
  //   if (!isLoggedIn || !spotifyCookie) {
  //     setIsLoggedIn(false);
  //   }
  // }, [isLoggedIn, setIsLoggedIn]);

  return (
    <div className="text-center">
      <div className="max-w-sm w-9/12 flex flex-col mx-auto mt-10 h-full">
        <LogoView />
        {isLoggedIn ? <LoginSpotify /> : <Login />}
      </div>
    </div>
  );
}
