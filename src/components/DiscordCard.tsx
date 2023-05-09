import React from 'react';

import clsxm from '@/lib/clsxm';

import NextImage from '@/components/NextImage';

import { api } from '@/utils/api';
import { getDiscordImgUrl } from '@/utils/discordImg';

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
      <div className='flex items-center justify-end space-x-4'>
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
              src={
                data?.activities[0]?.assets
                  ? getDiscordImgUrl(
                      'app-assets',
                      data?.activities[0]?.application_id,
                      data?.activities[0]?.assets?.large_image
                    )
                  : `https://dcdn.dstn.to/app-icons/${data?.activities[0].application_id}`
              }
              width={70}
              height={70}
              alt='Discord activity'
              imgClassName='rounded-xl'
            />
            <div>
              <h4>{data?.activities[0]?.name}</h4>
              <p>{data?.activities[0]?.details}</p>
              <p>{data?.activities[0]?.state}</p>
              <p>{timeElapsed()}</p>
            </div>
          </>
        ) : (
          <h4>Not playing anything</h4>
        )}
      </div>
    </>
  );
}
