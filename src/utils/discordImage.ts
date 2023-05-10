export function getDiscordImgUrl(
  type: 'avatars' | 'app-assets',
  id?: string,
  avatar?: string
) {
  return `https://cdn.discordapp.com/${type}/${id}/${avatar}.${
    avatar?.startsWith('a_') ? 'gif' : 'png'
  }${type === 'avatars' ? '?size=512' : ''}`;
}

interface DiscordActivity {
  application_id: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

export function getActivityImage(activity: DiscordActivity) {
  if (activity.assets) {
    if (activity.assets.large_image?.startsWith('mp:')) {
      const url = activity.assets.large_image.split('/https/')[1];
      return `https://${url}`;
    }
    return getDiscordImgUrl(
      'app-assets',
      activity.application_id,
      activity.assets?.large_image
    );
  }
  return `https://dcdn.dstn.to/app-icons/${activity.application_id}`;
}
