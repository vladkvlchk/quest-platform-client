export type TProfile = IProfile;

interface IProfile {
  name: string;
  aboutMe: string;
  avatar: File | undefined;
}
