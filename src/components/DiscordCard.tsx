import React from 'react';
import { BsDiscord } from 'react-icons/bs';

import clsxm from '@/lib/clsxm';

import NextImage from '@/components/NextImage';

import { api } from '@/utils/api';
import { getActivityImage, getDiscordImgUrl } from '@/utils/discordImage';

export default function DiscordCard() {
  const { data } = api.discord.get.useQuery();

  const since = new Date(data?.activities[0]?.timestamps?.start).getTime();

  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getTime() - since);
    }, 1000);
    return () => clearInterval(interval);
  }, [since]);

  const timeElapsed = () => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return `${hours > 0 ? `${hours}h ` : ''} ${
      minutes > 0 ? `${minutes % 60}m ` : ''
    } ${seconds > 0 ? `${seconds % 60}s` : ''}`;
  };

  return (
    <>
      <div className='my-auto flex items-center justify-end space-x-4'>
        <BsDiscord className='text-primary absolute left-4 top-4 -z-[1] -rotate-12 text-8xl' />
        <div className='text-end'>
          <h2>{data?.username}</h2>
          <p>#{data?.discriminator}</p>
        </div>
        <NextImage
          useSkeleton={data === null}
          src={getDiscordImgUrl('avatars', data?.id, data?.avatar)}
          width={100}
          height={100}
          alt='Discord avatar'
          imgClassName={clsxm(
            'rounded-full border-4',
            data?.status === 'online'
              ? 'border-green-500'
              : data?.status === 'idle'
              ? 'border-yellow-500'
              : data?.status === 'dnd'
              ? 'border-red-500'
              : 'border-gray-500'
          )}
        />
      </div>
      <div className='shadow-neumorphismInset flex items-center space-x-4 rounded-xl p-4'>
        {data?.activities[0]?.type === 0 ? (
          <>
            <NextImage
              src={getActivityImage(data.activities[0])}
              fill
              alt='Discord activity'
              imgClassName='rounded-xl object-cover'
              className='relative h-16 w-16'
            />
            <div>
              <p className='font-bold'>{data?.activities[0]?.name}</p>
              <p className='text-sm'>{data?.activities[0]?.details}</p>
              <p className='text-sm'>{data?.activities[0]?.state}</p>
              <p className='text-sm'>{timeElapsed()}</p>
            </div>
          </>
        ) : (
          <h4>Not playing anything</h4>
        )}
      </div>
    </>
  );
}
