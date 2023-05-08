export function getDiscordImgUrl(
  type: 'avatars' | 'app-assets',
  id?: string,
  avatar?: string
) {
  return `https://cdn.discordapp.com/${type}/${id}/${avatar}.${
    avatar?.startsWith('a_') ? 'gif' : 'png'
  }${type === 'avatars' ? '?size=512' : ''}`;
}
