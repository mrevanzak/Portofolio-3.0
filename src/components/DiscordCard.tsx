import React from 'react';

import clsxm from '@/lib/clsxm';

import NextImage from '@/components/NextImage';

import { api } from '@/utils/api';
import { getDiscordImgUrl } from '@/utils/discordImg';

export default function DiscordCard() {
  const { data } = api.discord.get.useQuery();

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
        <NextImage
          src={getDiscordImgUrl(
            'app-assets',
            data?.activities[0]?.application_id,
            data?.activities[0]?.assets?.large_image
          )}
          width={70}
          height={70}
          alt='Discord activity'
          imgClassName='rounded-xl'
        />
        <div>
          <h4>Playing {data?.activities[0]?.name}</h4>
          <p>{data?.activities[0]?.details}</p>
          <p>{data?.activities[0]?.state}</p>
          <p>{data?.activities[0]?.timestamps?.start}</p>
        </div>
      </div>
    </>
  );
}
