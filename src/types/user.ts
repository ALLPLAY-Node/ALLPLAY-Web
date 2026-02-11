export type User = {
  id: string;
  userId: string;
  birth: string;
  profilePhotoUrl: string;
  introduce: string;
  region: {
    city: string;
    district: string;
  };
};
